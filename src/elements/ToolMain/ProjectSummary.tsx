import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";

const ProjectSummary = () => {
  const Project = useRecoilValue(ProjectKey);
  return (
    <div className="w-9/12 h-full flex items-center">
      <img className="rounded-full" width="88px" height="88px" src={Project.thumbnail} alt="" />
      <div className="flex flex-col justify-center space-y-2 ml-[26px]">
        <div className="w-full flex items-center">
          <span className="text-4xl sm:text-2xl font-semibold">{Project.title}</span>
        </div>
        <span className="text-lg">{Project.summary}</span>
      </div>
    </div>
  );
};

export default ProjectSummary;
