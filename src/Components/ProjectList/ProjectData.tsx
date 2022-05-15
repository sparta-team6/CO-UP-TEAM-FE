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
      inviteCode: roomData?.inviteCode,
    });
  };
  return (
    <React.Fragment>
      {data?.data?.map((room, index) => {
        return (
          <div
            key={index}
            className="relative w-[300px] h-[300px] bg-slate-100 rounded-lg flex flex-col justify-center items-center mb-4 mr-6 sm:m-0"
          >
            <div onClick={() => onClick(room?.pjId)} className="w-full h-full">
              <div className="w-full h-1/2 flex justify-center items-center">
                <img className="rounded-full w-[100px] h-[100px]" src={room.thumbnail} alt="" />
              </div>
              <div className="w-full h-1/2 flex flex-col justify-around items-center">
                <div className="w-full h-[30%] bg-white flex justify-center">테스트 빈 칸</div>
                <div className="w-full h-[70%] bg-yellow-200 rounded-lg flex flex-col items-center">
                  <span>{room.title}</span>
                  <span className="whitespace-pre-wrap break-all">{room.summary}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              {/* 현재 pjID를 id로 받아왔음 */}
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
