import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { queryClient } from "..";
import { useGetChatting } from "../api/ChatQuery";
import { MyProfile } from "../recoil/MyProfile";
import { ProjectKey } from "../recoil/RoomID";
import ChatPre from "./ChatPre";

export interface content {
  senderLoginId: string;
  message: string;
  pjId: string;
  profileImage: string;
  nickname: string;
  dateTime: string;
}

/* 기본 api url 주소 */
const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);
stompClient.debug = () => {};

const Chat = () => {
  const [messages, setMessages] = React.useState<content[]>([]);
  const { pjId } = useRecoilValue(ProjectKey);
  const user = useRecoilValue(MyProfile);
  const senderLoginId = user.loginId;
  const { data } = useGetChatting(String(pjId));
  const result = data?.data;
  const pageNumber = result === 20 ? data?.data[19].id : 0;

  useEffect(() => {
    stompClient.connect({}, () => {
      console.log("connect");
      stompClient.subscribe(`/sub/chatting/${pjId}`, (data) => {
        const newMessage: content = JSON.parse(data.body) as content;
        addMessage(newMessage);
        queryClient.invalidateQueries("getChatting");
      });
    });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      stompClient.subscribe(`/sub/chatting/${pjId}`, async (data) => {
        const newMessage: content = (await JSON.parse(data.body)) as content;
        addMessage(newMessage);
        queryClient.invalidateQueries("getChatting");
      });
    }, 500);
  }, [pjId, messages]);

  const addMessage = (content: content) => {
    setMessages((prev) => [...prev, content]);
  };
  return (
    <div className="w-[432px] h-[calc(100%-4rem)] bg-[#fff] dark:bg-6 flex flex-col justify-end absolute top-16 right-0 border-l border-[#E7EBF2] border-solid md:hidden">
      <ChatPre
        messages={messages}
        contents={data?.data}
        senderLoginId={senderLoginId}
        pjId={pjId}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default Chat;
