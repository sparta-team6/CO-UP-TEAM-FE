import React from "react";
import Chart from "../Components/ToolMain/Chart";
import Member from "../Components/ToolMain/Member";

const TeamList = () => {
  return (
    <React.Fragment>
      <div className="w-72 h-full flex flex-col sm:h-screen bg-[#fff] dark:bg-6">
        <div className="w-72 h-[310px] flex flex-col items-center sm:mt-16">
          <Chart />
          <div className="w-[248px] h-[1px] bg-gray-200 -mt-1" />
        </div>
        <div className="w-full h-[calc(100%-29rem)] px-4 sm:overflow-auto">
          <Member />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamList;
