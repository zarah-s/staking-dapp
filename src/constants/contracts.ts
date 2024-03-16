import { ethers } from "ethers";
import StakingAbi from "./stakingAbi.json";
import TokenAbi from "./tokenAbi.json";
import { JsonRpcSigner } from "ethers";
import { JsonRpcProvider } from "ethers";

export const getStakingContract = (providerOrSigner: JsonRpcSigner | JsonRpcProvider) =>
    new ethers.Contract(
        import.meta.env.VITE_contract_address,
        StakingAbi,
        providerOrSigner
    );



export const getTokenContract = (providerOrSigner: JsonRpcSigner | JsonRpcProvider) =>
    new ethers.Contract(
        import.meta.env.VITE_TOKEN_ADDRESS,
        TokenAbi,
        providerOrSigner
    );
