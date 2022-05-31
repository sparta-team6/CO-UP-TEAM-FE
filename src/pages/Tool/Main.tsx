import Chat from "../../layout/Chat";
import CalendarEL from "../../elements/ToolMain/CalendarEL";
import MemberChart from "../../Components/ToolMain/MemberChart";
import ProjectAnnouncement from "../../elements/ToolMain/ProjectAnnouncement";
import ProjectMain from "../../Components/ToolMain/ProjectMain";
import SlidingMain from "../../Components/ToolMain/SlidingMain";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HandleOpen } from "../../recoil/AtomsInterface";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ProjectKey } from "../../recoil/RoomID";

const ToolMain = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  const { title } = useRecoilValue(ProjectKey);
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Helmet>
        <title>CO-UP | {title}</title>
      </Helmet>
      <div className="w-full h-screen flex justify-between relative pt-16 md:h-full md:justify-start">
        <SlidingMain />
        <div className="w-[calc(100%-800px)] h-full bg-[#f0f3f6] flex flex-col ml-[368px] md:w-[calc(100%-21rem)] sm:w-full sm:m-0">
          <div className="w-full h-full px-[51px] dark:bg-8 sm:px-[16px] flex flex-col">
            <ProjectMain />
            <div className="w-full flex md:flex-col md:h-full">
              <div className="w-full max-w-[612px] h-[332px] md:max-w-full md:h-[300px]">
                <ProjectAnnouncement />
              </div>
              <div className="w-full max-w-[396px] min-w-max h-full ml-[12px] md:ml-0 md:max-w-full md:h-full sm:h-full">
                <CalendarEL />
              </div>
            </div>
            <div className="w-full max-w-[1018px] h-[381px] mt-[10px] sm:mt-4 sm:mb-[100px]">
              <div className="w-full bg-[#ffffff] dark:bg-7 border-[#D7DCE5] dark:border-[#666666] border-[1px] border-solid rounded-2xl h-full">
                <MemberChart />
              </div>
            </div>
          </div>
          <Chat />
        </div>
      </div>
    </>
  );
};

export default ToolMain;
