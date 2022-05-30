import React from "react";
import Chart from "../Components/ToolMain/Chart";
import Member from "../Components/ToolMain/Member";

const TeamList = () => {
  return (
    <React.Fragment>
      <div className="w-72 h-full flex flex-col sm:h-screen bg-[#fff] dark:bg-6 dark:border-[#606468] border-r-[1px] border-solid border-[#E7EBF2] sm:overflow-auto">
        <div className="w-72 h-[310px] sm:h-[280px] flex flex-col items-center sm:mt-16">
          <Chart />
          <div className="w-[248px] h-[1px] bg-[#E5E7EB] dark:bg-[#E7EBF2] -mt-1" />
        </div>
        <div className="w-full h-[calc(100%-29rem)] px-4">
          <Member />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamList;
