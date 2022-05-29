import React from "react";
import CopyURL from "../../elements/ToolMain/CopyURL";
import ProjectSummary from "../../elements/ToolMain/ProjectSummary";

const ProjectMain = () => {
  return (
    <div className=" flex mt-[30px] sm:mt-[20px] mb-[22px] sm:mb-[20px] items-center sm:items-start justify-between">
      <ProjectSummary />
      <CopyURL />
    </div>
  );
};

export default React.memo(ProjectMain);
