import { useEffect, useState } from "react";
import { getTokenContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useTokenBalance = () => {
    const { address } = useWeb3ModalAccount()
    const [balance, setBalance] = useState<null | string>(null);

    useEffect(() => {
        (async () => {
            const contract = getTokenContract(readOnlyProvider);

            const response = await contract.balanceOf(address)
            setBalance(response.toString())
        })()

    }, [address])

    return balance;
}


export default useTokenBalance;