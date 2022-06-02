import { useEffect, useState } from "react";
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
stompClient.debug = () => {};

const MobileChatCom = () => {
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
    <div className="w-full h-[calc(100vh-150px)] bg-white flex flex-col justify-end absolute top-16">
      <MobileChatPre
        pageParams={pageParams}
        setPageParams={setPageParams}
        contents={data?.data}
        senderLoginId={String(senderLoginId)}
        pjId={pjId}
      />
    </div>
  );
};

export default MobileChatCom;
