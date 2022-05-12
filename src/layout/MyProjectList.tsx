import { useNavigate } from "react-router-dom";
import { useGetRoom } from "../api/ProjectQuery";

const MyProjectList = () => {
  const navigate = useNavigate();
  const { data } = useGetRoom();
  const onClick = (roomID: number) => {
    navigate(`/tool/${roomID}`);
  };

  return (
    <div className="w-12 h-full flex flex-col justify-start items-center space-y-5 bg-slate-500 sm:h-screen">
      <div className="sm:mt-12">
        {data?.data.map((room, index) => (
          <div onClick={() => onClick(room.id)} key={index}>
            <img className="w-10 h-10 rounded-lg mt-2" src={room.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjectList;
