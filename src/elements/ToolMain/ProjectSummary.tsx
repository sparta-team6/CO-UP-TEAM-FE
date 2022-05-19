import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";

const ProjectSummary = () => {
  const Project = useRecoilValue(ProjectKey);
  return (
    <div className="w-9/12 h-full">
      <div className="w-full h-full flex space-x-4 items-center">
        <img className="rounded-full" width="88px" height="88px" src={Project.thumbnail} alt="" />
        <div className="w-full h-full flex flex-col justify-center space-y-1">
          <div className="w-full flex space-x-10 items-center">
            <span className="text-4xl sm:text-2xl font-semibold">{Project.title}</span>
          </div>
          <span className="text-lg">{Project.summary}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
