import Backend from "../../Layouts/Backend";

function Dashboard() {
  return (
    <Backend>
      <div className="w-full min-h-120 flex justify-center items-center space-x-8">
        {/* <div>
          <h1 className="text-8xl">
            <span className="text-red-600">B</span>
            <span className="text-orange-800">I</span>
            <span className="text-">G</span>
          </h1>
        </div>
        <div>
          <h1 className="text-8xl">
            <span className="">B</span>
            <span className="">A</span>
            <span className="">Z</span>
            <span className="">Z</span>
            <span className="">R</span>
          </h1>
        </div> */}
        <h1 className="text-8xl h-30 font-extrabold bg-linear-to-r from-orange-600 via-blue-300 to-blue-600 bg-clip-text text-transparent">
          BIG SALE </h1>
      </div>
    </Backend>
  );
}

export default Dashboard;
