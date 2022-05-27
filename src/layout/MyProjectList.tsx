import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React from "react";

const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);
// eslint-disable-next-line @typescript-eslint/no-empty-function
stompClient.debug = () => {};

const MyProjectList = () => {
  const setOpen = useSetRecoilState(HandleOpen);
  const setProject = useSetRecoilState(ProjectKey);
  const [theme, DarkMode] = useRecoilState(themeState);
  const { pjId } = useRecoilValue(ProjectKey);
  const navigate = useNavigate();
  const { data } = useGetRoom();

  // 연결해제, 구독해제
  const wsDisConnectUnsubscribe = React.useCallback(() => {
    try {
      stompClient.disconnect(() => {
        console.log("disconnect");
        stompClient.unsubscribe(`/sub/chatting/${pjId}`);
        console.log("unsubscribe");
      });
    } catch (err) {
      console.log(err);
    }
  }, [stompClient]);
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
  };
  const { mutateAsync } = useLogOut();
  const onLogOut = () => {
    mutateAsync()
      .then(() => {
        alert("안녕히가세여");
        navigate("/");
      })
      .catch(() => {
        alert("로그인 실패");
      });
  };
  const onDarkMode = () => {
    DarkMode((prev: boolean) => !prev);
  };
  return (
    <div className="w-20 h-[calc(100%-4rem)] bg-[#e7ebf2] dark:bg-gray-700 flex flex-col justify-between items-center sm:h-[calc(100vh-5rem)] sm:pt-16">
      <Scroll className="mt-[8px] w-full h-[calc(100%-190px)] flex flex-col items-center overflow-auto">
        {data?.data.map((room, index) => (
          <motion.div whileHover={{ scale: 1.1 }} onClick={() => onClick(room.pjId)} key={index}>
            <img
              className="w-[48px] h-[48px] sm:w-[44px] sm:h-[44px] rounded-md mt-[16px]"
              src={room.thumbnail}
              alt=""
            />
          </motion.div>
        ))}
      </Scroll>
      <div className="w-20 h-52 flex flex-col justify-center items-center space-y-[27px]">
        <div className="cursor-pointer" onClick={onDarkMode}>
          {theme ? <Moon /> : <Sun />}
        </div>
        <Link onClick={wsDisConnectUnsubscribe} className="cursor-pointer" to="/projectList">
          <Logout />
        </Link>
        <div className="cursor-pointer" onClick={onLogOut}>
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
