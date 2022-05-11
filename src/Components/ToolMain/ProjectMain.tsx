import React from "react";
import { useParams } from "react-router-dom";
import { useGetRoom } from "../../api/ProjectQuery";
import CopyURL from "../../elements/ToolMain/CopyURL";
import ProjectSummary from "../../elements/ToolMain/ProjectSummary";

const ProjectMain = () => {
  const { id } = useParams();
  const { data } = useGetRoom();
  const roomData = data?.data.find((r) => r.id === Number(id));

  return (
    <div className="flex p-2 sm:p-1">
      <ProjectSummary
        ProjectImg={roomData?.img}
        ProjectTitle={roomData?.title}
        ProjectSummary={roomData?.summary}
      />
      <CopyURL ProjectURL={roomData?.id} />
    </div>
  );
};

export default React.memo(ProjectMain);
