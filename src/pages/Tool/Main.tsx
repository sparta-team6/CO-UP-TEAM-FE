import Chat from "../../layout/Chat";
import CalendarEL from "../../elements/ToolMain/CalendarEL";
import MemberChart from "../../Components/ToolMain/MemberChart";
import ProjectAnnouncement from "../../elements/ToolMain/ProjectAnnouncement";
import ProjectMain from "../../Components/ToolMain/ProjectMain";
import { useState } from "react";
import SlidingMain from "../../Components/ToolMain/SlidingMain";

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    if (open) setOpen(false);
  };

  return (
    <div
      onClick={handleToggle}
      className="w-full h-screen bg-slate-200 flex justify-between relative pt-12 md:h-full md:justify-start"
    >
      <SlidingMain open={open} setOpen={setOpen} />
      <div className="w-[calc(100%-41rem)] h-full flex flex-col ml-[336px] p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
        <div className="w-full h-full flex flex-col">
          <ProjectMain />
          <div className="w-full flex md:flex-col">
            <div className="w-3/5 h-[450px] p-2 md:w-full md:h-[300px] sm:p-1">
              <ProjectAnnouncement />
            </div>
            <div className="w-2/5 min-w-max h-[450px] p-2 md:w-full md:h-full sm:h-[280px] sm:p-1">
              <CalendarEL />
            </div>
          </div>
          <div className="w-full p-2 sm:p-1">
            <div className="w-full bg-white rounded-2xl shadow-xl h-80 md:h-full">
              <MemberChart />
            </div>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default Main;
