import { useEffect, useState } from "react";
import { getTokenContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useTokenBalance = (event: number) => {
    const { address } = useWeb3ModalAccount()
    const [balance, setBalance] = useState<null | string>(null);

    useEffect(() => {
        (async () => {
            if (!address) return;
            const contract = getTokenContract(readOnlyProvider);

            const response = await contract.balanceOf(address)
            setBalance(response.toString())
        })()

    }, [address, event])

    return balance;
}


export default useTokenBalance;