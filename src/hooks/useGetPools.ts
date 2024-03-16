import { useEffect, useState } from "react";
import { getStakingContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { ethers } from "ethers";
import Abi from "../constants/stakingAbi.json"
import multicallAbi from '../constants/multicall.json'
import { Pool } from "../interfaces/Pool";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useGetPools = (event: number) => {
    const [pools, setPools] = useState<Pool[]>([]);
    const { address } = useWeb3ModalAccount()


    useEffect(() => {
        (async () => {
            const itf = new ethers.Interface(Abi);
            const contract = getStakingContract(readOnlyProvider);
            const data = await contract.id();
            const _poolCount = Number(data.toString());
            let calls = [];
            if (!address) return;
            for (let i = 0; i < _poolCount; i++) {
                calls.push({
                    target: import.meta.env.VITE_contract_address,
                    callData: itf.encodeFunctionData("getPoolByID", [i]),
                })

            }

            for (let i = 0; i < _poolCount; i++) {
                calls.push({
                    target: import.meta.env.VITE_contract_address,
                    callData: itf.encodeFunctionData("getUserStakeBalance", [i, address]),
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
            let poolResponse = []
            let stakeBalanceResponse = [];

            for (let i = 0; i < callResults.length / 2; i++) {
                // const element = array[i];
                poolResponse.push(itf.decodeFunctionResult("getPoolByID", callResults[i][1]))

            }

            for (let i = callResults.length / 2; i < callResults.length; i++) {
                // const element = array[i];
                stakeBalanceResponse.push(itf.decodeFunctionResult("getUserStakeBalance", callResults[i][1]))

            }


            // const response = callResults.map((res: any) => (itf.decodeFunctionResult("getPoolByID", res[1])));
            let _pools: Pool[] = [];
            for (let i = 0; i < poolResponse.length; i++) {
                const obj = poolResponse[i][0];
                _pools.push({
                    totalStakers: Number(obj.totalStakers.toString()),
                    rewardRate: Number(obj.rewardRate.toString()),
                    rewardReserve: Number(obj.rewardReserve.toString()),
                    totalStaked: Number(obj.totalStaked.toString()),
                    stakeBalance: Number(stakeBalanceResponse[i])
                })

            }
            setPools(_pools)
        })()


    }, [address, event])
    return pools;
}


export default useGetPools;