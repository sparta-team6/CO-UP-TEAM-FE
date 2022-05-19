import React from "react";
import CopyURL from "../../elements/ToolMain/CopyURL";
import ProjectSummary from "../../elements/ToolMain/ProjectSummary";

const ProjectMain = () => {
  return (
    <div className="flex mt-[65px] mb-[30px] sm:p-1 items-center justify-between">
      <ProjectSummary />
      <CopyURL />
    </div>
  );
};

export default React.memo(ProjectMain);
