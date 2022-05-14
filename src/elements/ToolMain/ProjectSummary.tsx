import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";

const ProjectSummary = () => {
  const Project = useRecoilValue(ProjectKey);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex space-x-4 items-center">
        <img className="rounded-full" width="80px" height="80px" src={Project.thumbnail} alt="" />
        <div className="w-full h-full flex flex-col justify-center space-y-3">
          <div className="w-full flex space-x-10 items-center">
            <span className="text-2xl font-semibold">{Project.title}</span>
          </div>
          <span>{Project.summary}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
