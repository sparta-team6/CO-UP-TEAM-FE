import React from "react";
import Chart from "../Components/ToolMain/Chart";
import Member from "../Components/ToolMain/Member";

const TeamList = () => {
  return (
    <React.Fragment>
      <div className="w-72 h-full flex flex-col sm:h-screen sm:bg-white">
        <div className="w-72 h-72 flex flex-col items-center sm:mt-12">
          <Chart />
          <div className="w-60 h-[2px] bg-gray-200 -mt-2" />
        </div>
        <div className="w-full h-full px-4 mt-2">
          <Member />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamList;
