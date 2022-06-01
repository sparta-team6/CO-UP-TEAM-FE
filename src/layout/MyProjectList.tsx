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
import styled from "styled-components";
import Swal from "sweetalert2";
import { KickBtn } from "../recoil/AtomKickBtn";

const MyProjectList = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  const setProject = useSetRecoilState(ProjectKey);
  const [theme, DarkMode] = useRecoilState(themeState);
  const navigate = useNavigate();
  const { data } = useGetRoom();
  const kickEvent = useSetRecoilState(KickBtn);
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
      projectRole: String(roomData?.projectRole),
    });
    kickEvent(false);
  };
  const { mutateAsync } = useLogOut();
  const onLogOut = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        mutateAsync().then(() => {
          navigate("/");
        });
      }
    });
  };
  const onDarkMode = () => {
    DarkMode((prev: boolean) => !prev);
  };
  return (
    <div className="w-20 h-[calc(100%-4rem)] bg-[#e7ebf2] dark:bg-[#444C54] flex flex-col justify-between items-center sm:h-[calc(100vh-4rem)] sm:pt-16">
      <Scroll className="tutorial-main1 mt-[8px] w-full h-[calc(100%-190px)] flex flex-col items-center overflow-auto">
        {data?.data.map((room, index) => (
          <motion.div whileHover={{ scale: 1.05 }} onClick={() => onClick(room.pjId)} key={index}>
            <img
              className="w-[48px] h-[48px] sm:w-[44px] sm:h-[44px] rounded-md mt-[16px] cursor-pointer"
              src={room.thumbnail}
              alt=""
            />
          </motion.div>
        ))}
      </Scroll>
      <div className="w-20 h-52 flex flex-col justify-center items-center space-y-[27px]">
        <div className="tutorial-main8 cursor-pointer" onClick={onDarkMode}>
          {theme ? <Moon /> : <Sun />}
        </div>
        <Link className="tutorial-main10 cursor-pointer" to="/projectList">
          <Logout />
        </Link>
        <div className="tutorial-main9 cursor-pointer" onClick={onLogOut}>
          <Power />
        </div>
      </div>
    </div>
  );
};

export default MyProjectList;

const Scroll = styled.div`
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;
