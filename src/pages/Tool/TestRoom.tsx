import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useGetChatting } from "../../api/ChatQuery";
import { MyProfile } from "../../recoil/MyProfile";
import { ProjectKey } from "../../recoil/RoomID";
import { ChatPresenter } from "./TestRoomPresenter";

export interface content {
  senderLoginId: string;
  message: string;
  pjId: string;
}

/* 기본 api url 주소 */
const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);
// eslint-disable-next-line @typescript-eslint/no-empty-function
stompClient.debug = () => {};

const TestRoom = () => {
  const [messages, setMessages] = React.useState<content[]>([]);
  const { pjId } = useRecoilValue(ProjectKey);
  const user = useRecoilValue(MyProfile);
  const senderLoginId = user.loginId;
  const { data } = useGetChatting(String(pjId));
  console.log(data?.data);

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

  const addMessage = (content: content) => {
    setMessages((prev) => [...prev, content]);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ChatPresenter messages={messages} senderLoginId={senderLoginId} pjId={pjId} />
    </div>
  );
};

export default TestRoom;
