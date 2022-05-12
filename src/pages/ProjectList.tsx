import ProjectData from "../Components/ProjectList/ProjectData";
import ProjectMake from "../Components/ProjectList/ProjectMake";
import ProjectOpen from "../Components/ProjectList/ProjectOpen";

const ProjectList = () => {
  return (
    <div className="w-full h-[calc(100vh-2.5rem)] bg-slate-200 flex flex-col items-center justify-center absolute bottom-0">
      <div className="w-full h-full flex flex-col items-center mt-20">
        <div className=" w-[1300px] h-10 flex justify-between items-center md:w-[90%]">
          <div>
            <span className="font-semibold text-2xl">팀 리스트!</span>
          </div>
          <nav className="space-x-4 flex mr-6">
            <ProjectOpen />
          </nav>
        </div>
        <div className="w-[1300px] flex flex-wrap justify-start sm:justify-center md:w-[90%] sm:space-y-4">
          <ProjectData />
          <div className="w-[300px] h-[300px] rounded-lg border-[1px] border-solid flex justify-center items-center mr-6 sm:m-0">
            <ProjectMake />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
