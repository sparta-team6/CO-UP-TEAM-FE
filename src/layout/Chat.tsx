import React, { useEffect, useState } from "react";
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
  const { pjId } = useRecoilValue(ProjectKey);
  const user = useRecoilValue(MyProfile);
  const senderLoginId = user.loginId;
  const [pageParams, setPageParams] = useState<number>(100);
  const { data } = useGetChatting(String(pjId), pageParams);
  const result = data?.data;
  useEffect(() => {
    stompClient.connect({}, () => {});
    setTimeout(() => {
      stompClient.subscribe(`/sub/chatting/${pjId}`, async () => {
        queryClient.invalidateQueries(["getChatting", pjId]);
      });
    }, 500);
  }, [pjId, result, pageParams]);
  return (
    <div className="tutorial-main7 w-[432px] h-[calc(100%-4rem)] bg-[#fff] dark:bg-6 border-[#E7EBF2] dark:border-[#606468] border-l-[1px] border-solid flex flex-col justify-end absolute top-16 right-0 md:hidden">
      <ChatPre
        pageParams={pageParams}
        setPageParams={setPageParams}
        contents={data?.data}
        senderLoginId={String(senderLoginId)}
        pjId={pjId}
      />
    </div>
  );
};

export default Chat;
