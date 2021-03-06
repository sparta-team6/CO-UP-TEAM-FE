import { useNavigate } from "react-router-dom";
import { useGetRoom } from "../../api/ProjectQuery";
import React from "react";
import ProjectFixed from "../../elements/ProjectList/ProjectFixed";
import { useSetRecoilState } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import ProjectMake from "./ProjectMake";
import family from "../../images/ProjectList/coup_family.png";
import ProjectExit from "../../elements/ProjectList/ProjectExit";

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
      projectRole: String(roomData?.projectRole),
    });
  };
  return (
    <React.Fragment>
      {data?.data?.map((room, index) => {
        return (
          <div
            key={index}
            className="pjList relative w-[288px] h-[320px] bg-[#ffffff] dark:bg-6 rounded-lg flex flex-col justify-center items-center mb-[17px] sm:w-full sm:max-h-[290px] sm:mr-0 mr-[12px] cursor-pointer"
          >
            <div
              onClick={() => onClick(room.pjId)}
              className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg w-full h-full"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <img className="rounded-full w-24 h-24 mt-16" src={room.thumbnail} alt="" />
                <span className="mt-3 text-2xl text-ellipsis overflow-hidden whitespace-nowrap w-[270px] text-center">
                  {room.title}
                </span>
                <span className="mt-1 text-sm">
                  {room.createdTime?.replaceAll("-", "/").slice(0, 10)}
                </span>
                <span className="break-all mt-6 text-center text-base leading-6 text-ellipsis overflow-hidden whitespace-nowrap w-[270px]">
                  {room.summary}
                </span>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              {room.projectRole === "ADMIN" ? (
                <ProjectFixed
                  roomID={room.pjId}
                  roomImg={room.thumbnail}
                  roomTitle={room.title}
                  roomSummary={room.summary}
                />
              ) : (
                <ProjectExit roomID={room.pjId} />
              )}
            </div>
          </div>
        );
      })}
      <div className="tutorial-pl1 w-[288px] h-[320px] rounded-lg border-[1px] border-solid border-gray-300 flex justify-center items-center sm:w-full mb-[20px]">
        <ProjectMake />
      </div>
      {!data?.data ||
        (data?.data.length === 0 && (
          <img src={family} width={288} height={320} alt="" className="ml-3" />
        ))}
    </React.Fragment>
  );
};

export default ProjectData;
