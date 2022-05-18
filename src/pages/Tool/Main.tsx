import Chat from "../../layout/Chat";
import CalendarEL from "../../elements/ToolMain/CalendarEL";
import MemberChart from "../../Components/ToolMain/MemberChart";
import ProjectAnnouncement from "../../elements/ToolMain/ProjectAnnouncement";
import ProjectMain from "../../Components/ToolMain/ProjectMain";
import SlidingMain from "../../Components/ToolMain/SlidingMain";
import { useSetRecoilState } from "recoil";
import { HandleOpen } from "../../recoil/Atoms";
import { useEffect } from "react";

const ToolMain = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <div className="w-full h-screen flex justify-between relative pt-12 md:h-full md:justify-start">
      <SlidingMain />
      <div className="w-[calc(100%-780px)] h-full bg-slate-100 flex flex-col ml-[362px]  md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
        <div className="w-full h-full p-4 flex flex-col">
          <ProjectMain />
          <div className="w-full flex md:flex-col">
            <div className="w-full h-full p-2 md:w-full md:h-[300px] sm:p-1">
              <ProjectAnnouncement />
            </div>
            <div className="min-w-max h-full p-2 md:w-full md:h-full sm:h-[280px] sm:p-1">
              <CalendarEL />
            </div>
          </div>
          <div className="w-full p-2 sm:p-1">
            <div className="w-full bg-white rounded-2xl shadow-xl h-96 md:h-full">
              <MemberChart />
            </div>
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default ToolMain;
