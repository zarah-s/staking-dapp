import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Pool from "./components/Pool";
import { Controller } from "./controllers/Controller";
import useGetPools from "./hooks/useGetPools";
import ApproveDialog from "./components/ApproveDialog";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import InputDialog from "./components/InputDialog";
import useTokenBalance from "./hooks/useTokenBalance";
import { ethers } from "ethers";

const App = () => {
  const tokenBalance = useTokenBalance();
  const [poolId, setPoolId] = useState<number | null>(null);
  const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
  const [openInputDialog, setOpenInputDialog] = useState<boolean>(false);
  const [inputModalDetails, setInputModalDetails] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const pools = useGetPools();
  const [approveValue, setApproveValue] = useState<string | null>(null);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const controller = new Controller(chainId, walletProvider);
  const [rewardRate, setRewardRate] = useState<string | null>(null);
  const [
    functionExecutionType,
    setFunctionExecutionType,
  ] = useState<FunctionType | null>(null);
  return (
    <div className="min-h-screen h-full">
      <ApproveDialog
        onConfirm={async () => {
          if (!approveValue)
            return toast.error(
              "ERROR OCCURED: could not determine approve value"
            );

          await controller.approve(approveValue);
          setApproveValue(null);
          if (functionExecutionType !== null) {
            if (functionExecutionType === FunctionType.CreatePool) {
              await controller.createPool(rewardRate ?? "0");
            } else {
              await controller.stake(rewardRate ?? "0", poolId);
              /// handle stake func
            }
            setRewardRate(null);
            setFunctionExecutionType(null);
          }
        }}
        onChange={() => {
          setOpenApprovalModal(false);
          setApproveValue(null);
        }}
        open={openApprovalModal}
      />

      <InputDialog
        onChangeInput={(val: string) => setRewardRate(val)}
        title={inputModalDetails?.title ?? ""}
        description={inputModalDetails?.description ?? ""}
        onChange={() => {
          setOpenInputDialog(false);
        }}
        onConfirm={async () => {
          const success =
            functionExecutionType === FunctionType.Stake
              ? await controller.stake(rewardRate ?? "0", poolId)
              : await controller.createPool(rewardRate ?? "0");
          if (!success) {
            if (functionExecutionType === FunctionType.Stake) {
              setApproveValue(rewardRate);
            } else {
              setApproveValue("100");
            }
            setOpenApprovalModal(true);
          }
        }}
        open={openInputDialog}
      />
      <nav className="py-3 shadow shadow-[rgba(255,255,255,.1)]">
        <div className="flex items-center justify-between container">
          <h1 className="text-white madimi-one-regular text-3xl">STAKE</h1>
          <w3m-button />
        </div>
      </nav>

      <div className="container  mt-20">
        <div className="flex items-center mb-5 justify-end">
          <span className="text-white font-[600] text-xl">Token Balance:</span>
          <span className="text-[#ccc]">
            &nbsp; &nbsp;
            {tokenBalance === null
              ? "loading"
              : Number(ethers.formatUnits(tokenBalance, 18)).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center mb-8 justify-between">
          <h1 className="text-white text-xl font-[600]">POOLS</h1>
          <button
            onClick={async () => {
              setInputModalDetails({
                title: "Reward Rate",
                description: "Set reward rate",
              });
              setFunctionExecutionType(FunctionType.CreatePool);
              setOpenInputDialog(true);
            }}
            className="bg-blue-600 rounded py-3 text-sm text-white font-[600] px-7"
          >
            Create Pool
          </button>
        </div>
        <div className="flex flex-col m-auto p-auto">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap">
              {pools.map((pool, index) => {
                return (
                  <Pool
                    unStake={async () => {
                      await controller.unstake(index);
                    }}
                    onClaim={async () => {
                      await controller.claimReward(index);
                    }}
                    onStake={() => {
                      setPoolId(index);
                      setInputModalDetails({
                        title: "Stake Amount",
                        description: "Set stake amount",
                      });
                      setFunctionExecutionType(FunctionType.Stake);
                      setOpenInputDialog(true);
                    }}
                    id={index}
                    pool={pool}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

enum FunctionType {
  CreatePool,
  Stake,
}
