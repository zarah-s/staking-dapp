import Pool from "./components/Pool";

const App = () => {
  return (
    <div className="min-h-screen h-full">
      <nav className="py-3 shadow shadow-[rgba(255,255,255,.1)]">
        <div className="flex items-center justify-between container">
          <h1 className="text-white madimi-one-regular text-3xl">STAKE</h1>
          <w3m-button />
        </div>
      </nav>

      <div className="container mt-24">
        <div className="flex items-center mb-8 justify-between">
          <h1 className="text-white text-xl font-[600]">POOLS</h1>
          <button className="bg-blue-600 rounded py-3 text-sm text-white font-[600] px-7">
            Create Pool
          </button>
        </div>
        <div className="flex flex-col m-auto p-auto">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap">
              <Pool />
              <Pool />
              <Pool />
              <Pool />
              <Pool />
              <Pool />
              <Pool />
              <Pool />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
