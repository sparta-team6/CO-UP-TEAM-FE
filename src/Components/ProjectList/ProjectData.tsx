import { useNavigate } from "react-router-dom";
import { useGetRoom } from "../../api/ProjectQuery";
import React from "react";
import ProjectFixed from "../../elements/ProjectList/ProjectFixed";

const ProjectData = () => {
  const { data } = useGetRoom();
  const navigate = useNavigate();
  const onClick = (roomID: number) => {
    navigate(`/tool/${roomID}`);
  };
  return (
    <React.Fragment>
      {data?.data?.map((room, index) => {
        return (
          <div
            key={index}
            className="relative w-[300px] h-[300px] bg-slate-100 rounded-lg flex flex-col justify-center items-center mb-4 mr-6"
          >
            <div onClick={() => onClick(room.id)} className="w-full h-full">
              <div className="w-full h-1/2 flex justify-center items-center">
                <img
                  className="rounded-full w-[100px] h-[100px]"
                  src={room.img}
                  alt=""
                />
              </div>
              <div className="w-full h-1/2 flex flex-col justify-around items-center">
                <div className="w-full h-[30%] bg-white flex justify-center">
                  <span className="text-lg font-semibold">{room.name}</span>
                </div>
                <div className="w-full h-[70%] bg-yellow-200 rounded-lg flex flex-col items-center">
                  <span>{room.title}</span>
                  <span className="whitespace-pre-wrap break-all">
                    {room.summary}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <ProjectFixed
                roomID={room.id}
                roomImg={room.img}
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
