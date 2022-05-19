import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useGetRoom } from "../api/ProjectQuery";
import { useLogOut } from "../api/UserQuery";
import { HandleOpen } from "../recoil/AtomsInterface";
import { motion } from "framer-motion";
import { Logout } from "../elements/Icon/Logout";
import { Power } from "../elements/Icon/Power";
import { Moon } from "../elements/Icon/Moon";
import { Sun } from "../elements/Icon/Sun";
import { ProjectKey } from "../recoil/RoomID";
import { themeState } from "../recoil/DarkMode";

const MyProjectList = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  const setProject = useSetRecoilState(ProjectKey);
  const [theme, DarkMode] = useRecoilState(themeState);
  const navigate = useNavigate();
  const { data } = useGetRoom();
  const onClick = (roomID?: string) => {
    navigate(`/tool/${roomID}`);
    setOpen(false);
    const roomData = data?.data.find((r) => r.pjId === roomID);
    setProject({
      pjId: String(roomData?.pjId),
      thumbnail: String(roomData?.thumbnail),
      title: String(roomData?.title),
      summary: String(roomData?.summary),
      inviteCode: String(roomData?.inviteCode),
    });
  };
  const { mutateAsync } = useLogOut();
  const onLouout = () => {
    mutateAsync().then((res) => console.log(res));
  };
  const onDarkMode = () => {
    DarkMode((prev: boolean) => !prev);
  };
  return (
    <div className="w-[74px] h-[calc(100%-3rem)] bg-gray-200 flex flex-col justify-between items-center sm:h-[calc(100vh-80px)] sm:pt-12">
      <div className="mt-1">
        {data?.data.map((room, index) => (
          <motion.div whileHover={{ scale: 1.1 }} onClick={() => onClick(room.pjId)} key={index}>
            <img className="w-[46px] h-[46px] rounded-lg mt-2" src={room.thumbnail} alt="" />
          </motion.div>
        ))}
      </div>
      <div className="w-[74px] h-32 flex flex-col justify-between items-center mb-4">
        <span className="cursor-pointer" onClick={onDarkMode}>
          {theme ? <Moon /> : <Sun />}
        </span>
        <Link className="cursor-pointer" to="/projectList">
          <Power />
        </Link>
        <span className="cursor-pointer" onClick={onLouout}>
          <Logout />
        </span>
      </div>
    </div>
  );
};

export default MyProjectList;
