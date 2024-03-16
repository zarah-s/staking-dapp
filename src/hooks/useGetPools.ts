import { useEffect, useState } from "react";
import { getStakingContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { ethers } from "ethers";
import Abi from "../constants/stakingAbi.json"
import multicallAbi from '../constants/multicall.json'
import { Pool } from "../interfaces/Pool";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useGetPools = () => {
    const [pools, setPools] = useState<Pool[]>([]);
    const { address } = useWeb3ModalAccount()


    useEffect(() => {
        (async () => {
            const itf = new ethers.Interface(Abi);
            const contract = getStakingContract(readOnlyProvider);
            const data = await contract.id();
            const _poolCount = Number(data.toString());
            let calls = [];
            for (let i = 0; i < _poolCount; i++) {
                calls.push({
                    target: import.meta.env.VITE_contract_address,
                    callData: itf.encodeFunctionData("getPoolByID", [i]),
                })

            }
            const multicall = new ethers.Contract(
                import.meta.env.VITE_multicall_address,
                multicallAbi,
                readOnlyProvider
            );
            const callResults = await multicall.tryAggregate.staticCall(
                false,
                calls
            );
            const response = callResults.map((res: any) => (itf.decodeFunctionResult("getPoolByID", res[1])));
            let _pools: Pool[] = [];
            for (let i = 0; i < response.length; i++) {
                const obj = response[i][0];
                _pools.push({
                    totalStakers: Number(obj.totalStakers.toString()),
                    rewardRate: Number(obj.rewardRate.toString()),
                    rewardReserve: Number(obj.rewardReserve.toString()),
                    totalStaked: Number(obj.totalStaked.toString())
                })

            }
            setPools(_pools)
        })()


    }, [address])
    return pools;
}


export default useGetPools;