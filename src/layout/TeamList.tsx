import React from "react";
import Chart from "../Components/ToolMain/Chart";
import Member from "../Components/ToolMain/Member";

const TeamList = () => {
  return (
    <React.Fragment>
      <div className="w-72 h-full bg-slate-400 flex flex-col sm:h-screen">
        <div className="w-72 h-72  flex flex-col items-center sm:mt-12">
          <Chart />
          <div className="w-[85%] h-[2px] bg-sky-200" />
        </div>
        <div className="w-full h-full px-4 mt-2">
          <Member />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamList;
