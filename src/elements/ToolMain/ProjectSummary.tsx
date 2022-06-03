import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import JoyrideContainer from "../../Components/Tutorial/JoyrideContainer";
import { mainSteps } from "../../Components/Tutorial/Steps";
import { ProjectKey } from "../../recoil/RoomID";
import { HelpToolMain } from "../../recoil/AtomHelpCircle";
import { HelpCircle } from "../Icon/HelpCircle";

// 해당 프로젝트 제목 내용
const ProjectSummary = () => {
  const Project = useRecoilValue(ProjectKey);
  const [open, setOpen] = useState(false);
  const [isHelp, setIsHelp] = useRecoilState(HelpToolMain);
  const onClick = () => {
    setOpen(true);
    setIsHelp(true);
  };
  return (
    <>
      <JoyrideContainer run={open} steps={mainSteps} setOpen={setOpen} />
      <div className="w-full h-full flex items-center sm:flex-col sm:items-start">
        <img className="rounded-full" width="76px" height="76px" src={Project.thumbnail} alt="" />
        <div className="flex flex-col justify-center space-y-2 ml-[26px] sm:ml-0 sm:mt-[14px]">
          <div className="w-full flex items-center">
            <span className="text-3xl sm:text-2xl font-bold">{Project.title}</span>
            <div
              className={`cursor-pointer sm:hidden ml-[20px] ${
                isHelp ? "mb-[5px] hidden" : "animate-bounce"
              }`}
              onClick={onClick}
            >
              <HelpCircle />
            </div>
          </div>
          <span className="text-base break-all">{Project.summary}</span>
        </div>
      </div>
    </>
  );
};

export default ProjectSummary;
