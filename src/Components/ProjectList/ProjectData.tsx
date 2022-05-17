import { useNavigate } from "react-router-dom";
import { useGetRoom } from "../../api/ProjectQuery";
import React from "react";
import ProjectFixed from "../../elements/ProjectList/ProjectFixed";
import { useSetRecoilState } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";

const ProjectData = () => {
  const setProject = useSetRecoilState(ProjectKey);
  const { data } = useGetRoom();
  const navigate = useNavigate();
  const onClick = (roomID?: string) => {
    navigate(`/tool/${roomID}`);
    const roomData = data?.data.find((r) => r.pjId === roomID);
    setProject({
      pjId: String(roomData?.pjId),
      thumbnail: String(roomData?.thumbnail),
      title: String(roomData?.title),
      summary: String(roomData?.summary),
      inviteCode: String(roomData?.inviteCode),
    });
  };
  return (
    <React.Fragment>
      {data?.data?.map((room, index) => {
        return (
          <div
            key={index}
            className="relative w-[280px] h-[320px] bg-white rounded-lg flex flex-col justify-center items-center mb-4 mr-[20px] sm:m-0"
          >
            <div onClick={() => onClick(room.pjId)} className="w-full h-full">
              <div className="w-full flex flex-col justify-center items-center">
                <img className="rounded-full w-24 h-24 mt-12" src={room.thumbnail} alt="" />
                <span className="mt-3 text-2xl">{room.title}</span>
                <span className="mt-1 text-sm">2022/05/17</span>
                <span className="whitespace-pre-wrap break-all mt-6 text-center text-base leading-6">
                  {room.summary}
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <ProjectFixed
                roomID={room.pjId}
                roomImg={room.thumbnail}
                roomTitle={room.title}
                roomSummary={room.summary}
              />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default ProjectData;
