import Chat from "../../layout/Chat";
import CalendarEL from "../../elements/ToolMain/CalendarEL";
import MemberChart from "../../Components/ToolMain/MemberChart";
import ProjectAnnouncement from "../../elements/ToolMain/ProjectAnnouncement";
import ProjectMain from "../../Components/ToolMain/ProjectMain";
import SlidingMain from "../../Components/ToolMain/SlidingMain";
import { useSetRecoilState } from "recoil";
import { HandleOpen } from "../../recoil/AtomsInterface";
import { useEffect } from "react";

const ToolMain = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <div className="w-full h-screen flex justify-between relative pt-16 md:h-full md:justify-start overflow-hidden">
      <SlidingMain />
      <div className="w-[calc(100%-800px)] h-full bg-slate-100 flex flex-col ml-[368px] md:w-[calc(100%-21rem)] sm:w-full sm:m-0">
        <div className="w-full h-full px-[52px] sm:px-[16px] flex flex-col">
          <ProjectMain />
          <div className="w-full flex md:flex-col">
            <div className="w-full max-w-[608px] h-[336px] md:max-w-full md:h-[300px]">
              <ProjectAnnouncement />
            </div>
            <div className="w-full max-w-[392px] min-w-max h-[336px] ml-[16px] md:ml-0 md:max-w-full md:h-full sm:h-full">
              <CalendarEL />
            </div>
          </div>
          <div className="w-full max-w-[1016px] h-[352px] mt-[16px]">
            <div className="w-full bg-white border border-solid rounded-2xl h-full">
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
