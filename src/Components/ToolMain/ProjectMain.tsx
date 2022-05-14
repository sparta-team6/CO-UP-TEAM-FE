import React from "react";
import CopyURL from "../../elements/ToolMain/CopyURL";
import ProjectSummary from "../../elements/ToolMain/ProjectSummary";

const ProjectMain = () => {
  return (
    <div className="flex p-2 sm:p-1 items-center">
      <ProjectSummary />
      <CopyURL />
    </div>
  );
};

export default React.memo(ProjectMain);
