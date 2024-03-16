import { ethers } from "ethers";
import { Pool as IPool } from "../interfaces/Pool";
import PoolDetail from "./PoolDetail";
interface Props {
  pool: IPool;
  id: number;
  onStake: () => void;
  onClaim: () => void;
  unStake: () => void;
}
const Pool = ({ id, pool, onStake, onClaim, unStake }: Props) => {
  return (
    <div className="inline-block px-3">
      <div className="w-80 h- max-w-xs p-5 overflow-hidden text-[#ccc] rounded-lg bg-[#2D2C43] duration-300 ease-in-out">
        <h3 className="text-center text-xl font-[500]">Pool #{id}</h3>
        <div className="space-y-3 mt-5">
          <PoolDetail
            label="Total Stakers"
            value={pool.totalStakers.toString()}
          />
          <PoolDetail
            label="Total Staked"
            value={Number(
              ethers.formatUnits(pool.totalStaked.toString(), 18)
            ).toLocaleString()}
          />
          <PoolDetail
            label="Reward Reserve"
            value={Number(
              ethers.formatUnits(pool.rewardReserve.toString(), 18)
            ).toLocaleString()}
          />
          <PoolDetail label="Reward Rate" value={pool.rewardRate.toString()} />
          <PoolDetail
            label="My Stake"
            value={ethers
              .formatUnits(pool.stakeBalance.toString(), 18)
              .toString()}
          />
        </div>
        <div className="flex justify-between items-center gap-3 mt-10 ">
          <button
            onClick={onStake}
            className="bg-blue-600 rounded py-1 text-sm text-white font-[600] px-3"
          >
            Stake
          </button>
          <button
            onClick={onClaim}
            className="bg-blue-600 rounded py-1 text-sm text-white font-[600] px-3"
          >
            Claim Reward
          </button>
          <button
            onClick={unStake}
            className="bg-blue-600 rounded py-1 text-sm text-white font-[600] px-3"
          >
            Unstake
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pool;
