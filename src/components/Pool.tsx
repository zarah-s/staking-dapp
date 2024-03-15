import PoolDetail from "./PoolDetail";

const Pool = () => {
  return (
    <div className="inline-block px-3">
      <div className="w-80 h- max-w-xs p-5 overflow-hidden text-[#ccc] rounded-lg bg-[#2D2C43] duration-300 ease-in-out">
        <h3 className="text-center text-xl font-[500]">Pool #0</h3>
        <div className="space-y-3 mt-5">
          <PoolDetail label="Total Stakers" value={100} />
          <PoolDetail label="Total Staked" value={100} />
          <PoolDetail label="Reward Reserve" value={100} />
          <PoolDetail label="Reward Rate" value={100} />
        </div>
        <div className="flex items-center gap-3 mt-10 justify-end ">
          <button className="bg-blue-600 rounded py-1 text-sm text-white font-[600] px-5">
            Stake
          </button>
          <button className="bg-blue-600 rounded py-1 text-sm text-white font-[600] px-5">
            Claim Reward
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pool;
