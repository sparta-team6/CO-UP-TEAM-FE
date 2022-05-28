import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { queryClient } from "../..";
import { useGetChatting } from "../../api/ChatQuery";
import MobileChatPre from "../../pages/Mobile/ChatPre";
import { MyProfile } from "../../recoil/MyProfile";
import { ProjectKey } from "../../recoil/RoomID";

export interface content {
  senderLoginId: string;
  message: string;
  pjId: string;
  profileImage: string;
  nickname: string;
  dateTime: string;
  loginId: string;
}

/* 기본 api url 주소 */
const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);
// eslint-disable-next-line @typescript-eslint/no-empty-function
stompClient.debug = () => {};

const MobileChatCom = () => {
  const [messages, setMessages] = React.useState<content[]>([]);
  const { pjId } = useRecoilValue(ProjectKey);
  const user = useRecoilValue(MyProfile);
  const senderLoginId = user.loginId;
  const { data } = useGetChatting(String(pjId));
  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe(`/sub/chatting/${pjId}`, (data) => {
        const newMessage: content = JSON.parse(data.body) as content;
        addMessage(newMessage);
      });
    });
    queryClient.invalidateQueries("getChatting");
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
    <div className="w-full h-[calc(100vh-150px)] bg-white flex flex-col justify-end absolute top-16">
      <MobileChatPre
        messages={messages}
        contents={data?.data}
        senderLoginId={senderLoginId}
        pjId={pjId}
      />
    </div>
  );
};

export default MobileChatCom;
