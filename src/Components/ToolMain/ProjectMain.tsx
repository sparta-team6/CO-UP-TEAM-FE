import React from "react";
import { useParams } from "react-router-dom";
import { useGetRoom } from "../../api/ProjectQuery";
import CopyURL from "../../elements/ToolMain/CopyURL";
import ProjectSummary from "../../elements/ToolMain/ProjectSummary";

const ProjectMain = () => {
  const { id } = useParams();
  const { data } = useGetRoom();
  const roomData = data?.data.find((r) => r.pjId === Number(id));

  return (
    <div className="flex p-2 sm:p-1 items-center">
      <ProjectSummary
        ProjectImg={roomData?.thumbnail}
        ProjectTitle={roomData?.title}
        ProjectSummary={roomData?.summary}
      />
      <CopyURL ProjectURL={roomData?.pjId} />
    </div>
  );
};

export default React.memo(ProjectMain);
