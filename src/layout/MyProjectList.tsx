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
import { removeTokenFromCookie } from "../servers/Cookie";

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
  const onLogOut = () => {
    mutateAsync()
      .then(() => {
        alert("안녕히가세여");
        navigate("/");
        removeTokenFromCookie();
      })
      .catch(() => {
        alert("로그인 실패");
      });
  };
  const onDarkMode = () => {
    DarkMode((prev: boolean) => !prev);
  };
  return (
    <div className="z-50 w-20 h-[calc(100%-4rem)] bg-gray-200 dark:bg-gray-700 flex flex-col justify-between items-center sm:h-[calc(100vh-80px)] sm:pt-16">
      <div className="mt-1">
        {data?.data.map((room, index) => (
          <motion.div whileHover={{ scale: 1.1 }} onClick={() => onClick(room.pjId)} key={index}>
            <img className="w-[48px] h-[48px] rounded-lg mt-[16px]" src={room.thumbnail} alt="" />
          </motion.div>
        ))}
      </div>
      <div className="w-20 h-32 flex flex-col justify-between items-center mb-4">
        <span className="cursor-pointer" onClick={onDarkMode}>
          {theme ? <Moon /> : <Sun />}
        </span>
        <Link className="cursor-pointer" to="/projectList">
          <Power />
        </Link>
        <span className="cursor-pointer" onClick={onLogOut}>
          <Logout />
        </span>
      </div>
    </div>
  );
};

export default MyProjectList;
