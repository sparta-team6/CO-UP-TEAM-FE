import React from "react";
import Chart from "../Components/ToolMain/Chart";
import Member from "../Components/ToolMain/Member";

const TeamList = () => {
  return (
    <React.Fragment>
      <div className="ml-20 w-72 h-full flex flex-col sm:h-screen bg-[#fff] dark:bg-gray-800">
        <div className="w-72 h-72 flex flex-col items-center sm:mt-16">
          <Chart />
          <div className="w-[248px] h-[1px] bg-gray-200 -mt-2" />
        </div>
        <div className="w-full h-[calc(100%-24rem)] px-4 mt-2">
          <Member />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamList;
