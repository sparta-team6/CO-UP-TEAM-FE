import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { content } from "./Chat";
import { fetchChatting } from "../api/ChatQuery";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { MyProfile } from "../recoil/MyProfile";

type ChatPresenterProps = {
  messages: Array<content>;
  senderLoginId: string;
  pjId: string;
  contents: Array<content>;
  pageNumber: number;
};

interface IForm {
  senderLoginId: string;
  message: string;
  pjId: string;
  profileImage: string;
  nickname: string;
}

const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);
//isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage,
const ChatPre = ({ contents, senderLoginId, pjId, pageNumber }: ChatPresenterProps) => {
  const { nickname, profileImage, loginId } = useRecoilValue(MyProfile);
  const { data } = useInfiniteQuery(["chat", pjId], () => fetchChatting(pjId, pageNumber), {
    // getNextPageParam: (_lastPage, pages) => {
    // },
  });
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleonEnter: SubmitHandler<IForm> = ({ message }) => {
    const newMessage = { message: message, senderLoginId, pjId, profileImage, nickname };
    stompClient.send("/pub/chatting/project", {}, JSON.stringify(newMessage));
    setValue("message", "");
  };
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [contents]);
  return (
    <>
      <div
        ref={messageBoxRef}
        className="w-full h-full space-y-[16px] overflow-y-auto flex flex-col-reverse items-center pb-3"
      >
        {contents?.map((box, index) => {
          return (
            <div
              className={`w-[366px] min-h-10  flex ${
                loginId === box.senderLoginId ? "justify-end" : "justify-start"
              }`}
              key={index}
            >
              <img
                className={`w-[36px] h-[36px] rounded-full ${
                  loginId === box.senderLoginId ? "hidden" : ""
                }`}
                src={box.profileImage}
                alt=""
              />
              <div
                className={`flex flex-col pl-[10px] ${
                  loginId === box.senderLoginId ? "text-right" : ""
                }`}
              >
                <span className="font-bold text-lg">{box.nickname}</span>
                <span className="text-[#AAA] text-xs">
                  {box.dateTime.replaceAll("-", ".").slice(0, 10)}
                </span>
                <span
                  className={`whitespace-pre-wrap break-all mt-2 leading-5 text-sm ${
                    loginId === box.senderLoginId ? "text-right" : ""
                  }`}
                >
                  {box.message}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="h-full flex flex-col justify-center items-center">
  <img src={EmptyChat} alt="" />
  <span className="pt-[41px] text-[#B0B0B0]">팀원들에게 메세지를 전달해보세요</span>
</div> */}
      <div className="w-full flex justify-center items-center relative bg-white">
        <form
          className="w-[384px] h-[120px] mb-7 bg-slate-200 outline-none flex items-center justify-center rounded-xl"
          onSubmit={handleSubmit(handleonEnter)}
        >
          <input
            className="w-full h-full p-[18px] rounded-xl border outline-none resize-none relative bg-[#F5F5F5]"
            // onKeyDown={onKeyDown}
            {...register("message")}
          />
          <button
            className="w-[56px] h-[36px] absolute right-9 bottom-10 text-white bg-3 rounded-[4px]"
            type="submit"
          >
            <span>전송</span>
          </button>
        </form>
        {/* <button disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
      </div>
    </>
  );
};

export default ChatPre;
