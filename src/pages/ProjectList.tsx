import ProjectData from "../Components/ProjectList/ProjectData";
import ProjectMake from "../Components/ProjectList/ProjectMake";
import ProjectOpen from "../Components/ProjectList/ProjectOpen";

const ProjectList = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-[#f0f3f7] flex flex-col items-center justify-center absolute bottom-0">
      <div className="w-full h-full flex flex-col items-center mt-20">
        <div className=" w-[1180px] flex justify-between items-center md:w-[90%]">
          <span className="text-4xl leading-[50px]">팀 리스트</span>
          <ProjectOpen />
        </div>
        <div className="w-[1180px] flex flex-wrap justify-start mt-8 sm:justify-center md:w-[90%] sm:space-y-4">
          <ProjectData />
          <div className="w-[280px] h-[320px] rounded-lg border-[1px] border-solid flex justify-center items-center sm:m-0">
            <ProjectMake />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
