import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

const useEvents = () => {
    const [stakingEventCount, setStakingEventCount] = useState<number>(0);
    const [tokenEventCount, setTokenEventCount] = useState<number>(0)
    const stakingEventListerner = useCallback(() => {
        setStakingEventCount((prev) => prev + 1);
    }, []);

    const tokenEventListener = useCallback(() => {
        setTokenEventCount((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const stakingFilter: { address: string, topics: string[] | any } = {
            address: import.meta.env.VITE_contract_address,
            topics: [
                [
                    ethers.id("poolCreated(uint256,uint256,uint256,address)"),
                    ethers.id("Stake(uint256,address,uint256,uint256)"),
                    ethers.id("Unstake(uint256,address,uint256,uint256)"),
                    ethers.id("RewardClaim(uint256,address,uint256,uint256)"),
                ]
            ],
        };

        const tokenFilter: { address: string, topics: string[] | any } = {
            address: import.meta.env.VITE_TOKEN_ADDRESS,
            topics: [
                ethers.id("Transfer(address,address,uint256)"),
            ],
        };

        const wssProvider2 = new ethers.WebSocketProvider(
            import.meta.env.VITE_wss_rpc_url
        );
        wssProvider2.on(stakingFilter, stakingEventListerner);
        wssProvider2.on(tokenFilter, tokenEventListener);
        return () => {
            wssProvider2.off(stakingFilter, stakingEventListerner);
            wssProvider2.off(tokenFilter, tokenEventListener);
        }
    }, [stakingEventListerner, tokenEventListener]);

    return [stakingEventCount, tokenEventCount];
};

export default useEvents;