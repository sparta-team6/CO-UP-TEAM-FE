import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ProjectKey } from "../../recoil/RoomID";
import { ChatPresenter } from "./TestRoomPresenter";

export interface content {
  senderLoginId: string;
  message: string;
  pjId: string;
}

/* 기본 api url 주소 */
const sockJS = new SockJS("https://api.cooperate-up.com/ws");
const stompClient: Stomp.Client = Stomp.over(sockJS);
// eslint-disable-next-line @typescript-eslint/no-empty-function
stompClient.debug = () => {};

const TestRoom = () => {
  const [messages, setMessages] = React.useState<content[]>([]);
  const [senderLoginId, setSenderLoginId] = React.useState("");
  const [content, setContent] = React.useState("");
  const { pjId } = useRecoilValue(ProjectKey);

  useEffect(() => {
    stompClient.connect({}, (frame) => {
      console.log(frame);
      // 백엔드에서 설정한 pjId별 채팅 room
      stompClient.subscribe(`sub/chatting/${pjId}`, (data) => {
        const newMessage: content = JSON.parse(data.body) as content;
        addMessage(newMessage);
      });
    });
  }, [messages]);

  const handleEnter = (senderLoginId: string, message: string, pjId: string) => {
    const newMessage: content = { senderLoginId, message, pjId };
    /* 백엔드에서 요청 post 보내는 api 주소 */
    stompClient.send("/pub/chatting/project", {}, JSON.stringify(newMessage));
    console.log("hi");
    setContent("");
  };

  const addMessage = (content: content) => {
    setMessages((prev) => [...prev, content]);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ChatPresenter
        messages={messages}
        handleEnter={handleEnter}
        content={content}
        setContent={setContent}
        senderLoginId={senderLoginId}
        setSenderLoginId={setSenderLoginId}
      />
    </div>
  );
};

export default TestRoom;
