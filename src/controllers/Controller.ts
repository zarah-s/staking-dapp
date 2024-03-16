import { Eip1193Provider, ethers, isAddress } from "ethers";
import { isSupportedChain } from "../utils";
// import { getProvider } from "../constants/providers";
// import { getProposalsContract } from "../constants/contracts";
import { toast } from "react-toastify";
import { getProvider } from "../constants/providers";
import { getStakingContract, getTokenContract } from "../constants/contracts";

export class Controller {
    chainId: number | undefined = undefined;
    walletProvider: Eip1193Provider | undefined = undefined;
    loading = false;


    constructor(_chainId: number | undefined, _walletProvider: Eip1193Provider | undefined) {
        this.chainId = _chainId
        this.walletProvider = _walletProvider
    }


    createPool = async (rewardRate: string) => {
        if (this.loading) return;
        if (!this.chainId) return toast.error("Connect wallet")
        if (rewardRate === "0" || Number.isNaN(rewardRate)) return toast.error("Invalid reward rate")
        if (!isSupportedChain(this.chainId!)) return toast.error("Wrong network");
        this.loading = true;
        const toastId = toast.loading("Processing");
        const readWriteProvider = getProvider(this.walletProvider!);
        const signer = await readWriteProvider.getSigner();
        const contract = getStakingContract(signer);
        try {
            const transaction = await contract.createPool(Number(rewardRate));
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            toast.dismiss(toastId)
            if (receipt.status) {
                toast.success("pool creation successfull!", { autoClose: 3000 })
                this.loading = false;
                return true;
            }
            toast.error("pool creation failed!", { autoClose: 3000 })
            this.loading = false;
            return true;
        } catch (error) {
            toast.dismiss(toastId)
            toast.error((error as any)?.reason ?? "Andd unknown error occured", { autoClose: 3000 })
            this.loading = false;
            return false;
        }
    };


    stake = async (amount: string, poolId: number | null) => {
        if (this.loading) return;
        if (poolId === null) return toast.error("Invalid pool Id")
        if (!this.chainId) return toast.error("Connect wallet")
        if (amount === "0" || Number.isNaN(amount)) return toast.error("Invalid amount")
        if (!isSupportedChain(this.chainId!)) return toast.error("Wrong network");
        this.loading = true;
        const toastId = toast.loading("Processing");
        const readWriteProvider = getProvider(this.walletProvider!);
        const signer = await readWriteProvider.getSigner();
        const contract = getStakingContract(signer);
        try {
            const transaction = await contract.stake(poolId, ethers.parseUnits(amount, 18));
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            toast.dismiss(toastId)
            if (receipt.status) {
                toast.success("stake successfull!", { autoClose: 3000 })
                this.loading = false;
                return true;
            }
            toast.error("stake failed!", { autoClose: 3000 })
            this.loading = false;
            return true;
        } catch (error) {
            toast.dismiss(toastId)
            toast.error((error as any)?.reason ?? "Andd unknown error occured", { autoClose: 3000 })
            this.loading = false;
            return false;
        }
    };


    approve = async (amount: string) => {
        if (this.loading) return;
        if (!this.chainId) return toast.error("Connect wallet")
        if (!isSupportedChain(this.chainId!)) return toast.error("Wrong network");
        this.loading = true;
        const toastId = toast.loading("Processing");
        const readWriteProvider = getProvider(this.walletProvider!);
        const signer = await readWriteProvider.getSigner();
        const contract = getTokenContract(signer);
        try {
            const transaction = await contract.approve(import.meta.env.VITE_contract_address, ethers.parseUnits(amount, 18));
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();

            console.log("receipt: ", receipt);

            toast.dismiss(toastId)
            if (receipt.status) {
                toast.success("approve successfull!", { autoClose: 3000 })
                this.loading = false;
                return;
            }
            toast.error("approve failed!", { autoClose: 3000 })
            this.loading = false;
        } catch (error) {
            toast.dismiss(toastId)
            toast.error((error as any)?.reason ?? "An unknown error occured", { autoClose: 3000 })
            this.loading = false;
        }
    };


    // handleVote = async (id) => {
    //     if (this.loading) return;
    //     if (!isSupportedChain(this.chainId)) return toast.error("Wrong network");
    //     this.loading = true;
    //     const toastId = toast.loading("Processing");
    //     const readWriteProvider = getProvider(this.walletProvider);
    //     const signer = await readWriteProvider.getSigner();
    //     const contract = getProposalsContract(signer);
    //     try {
    //         const transaction = await contract.vote(id);
    //         console.log("transaction: ", transaction);
    //         const receipt = await transaction.wait();
    //         console.log("receipt: ", receipt);
    //         toast.dismiss(toastId)
    //         if (receipt.status) {
    //             toast.success("vote successfull!", { autoClose: 3000 })
    //             this.loading = false;
    //             return;
    //         }
    //         toast.error("vote failed!", { autoClose: 3000 })
    //         this.loading = false;
    //     } catch (error) {
    //         toast.dismiss(toastId)
    //         toast.error(error?.reason ?? "An unknown error occured", { autoClose: 3000 })
    //         this.loading = false;
    //     }
    // };
}

