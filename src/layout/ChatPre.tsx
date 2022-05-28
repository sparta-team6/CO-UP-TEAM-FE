import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { content } from "./Chat";
import { fetchChatting } from "../api/ChatQuery";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { MyProfile } from "../recoil/MyProfile";
import EmptyChat from "../images/Main/EmptyChat.png";

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
    if (message.length === 1) return;
    console.log(message.length);
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const data = { text: e.currentTarget.value };
    const newMessage = { message: data.text, senderLoginId, pjId, profileImage, nickname };
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        handleonEnter(newMessage);
      }
    }
  };
  return (
    <>
      <div
        ref={messageBoxRef}
        className="w-full h-full space-y-[16px] overflow-y-auto flex flex-col-reverse items-center pb-3"
      >
        {contents?.map((box, index) => {
          return (
            <div
              className={`w-[366px] min-h-10 first:mt-4 flex ${
                loginId === box.senderLoginId ? "justify-end" : "justify-start"
              }`}
              key={index}
            >
              <img
                className={`w-[36px] h-[36px] -mt-2 rounded-full ${
                  loginId === box.senderLoginId ? "hidden" : ""
                }`}
                src={box.profileImage}
                alt=""
              />
              <div className={`flex flex-col pl-[10px] `}>
                <span
                  className={`font-bold text-lg ${loginId === box.senderLoginId ? "hidden" : ""}`}
                >
                  {box.nickname}
                </span>
                <div
                  className={`flex items-end justify-end gap-2 ${
                    loginId === box.senderLoginId ? "" : "flex-row-reverse"
                  }`}
                >
                  <span className="text-[#AAA] text-xs">
                    {box.dateTime.replaceAll("-", ".").slice(11, 16)}
                  </span>
                  <div
                    className={`min-w-[25px] min-h-[40px] bg-[#f5f5f5] p-[10px] rounded-md ${
                      loginId === box.senderLoginId ? "mt-2" : ""
                    }`}
                  >
                    <span
                      className={`whitespace-pre-wrap break-all mt-2 leading-5 text-sm text-gray-500 font-semibold tracking-tight`}
                    >
                      {box.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {contents?.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <img src={EmptyChat} alt="" />
          <span className="pt-[41px] text-[#B0B0B0]">팀원들에게 메세지를 전달해보세요</span>
        </div>
      ) : null}
      <div className="w-full flex justify-center items-center relative bg-white">
        <form
          className="w-[384px] h-[120px] mb-7 bg-slate-200 outline-none flex items-center justify-center rounded-xl"
          onSubmit={handleSubmit(handleonEnter)}
        >
          <textarea
            className="w-full h-full p-[18px] rounded-xl border outline-none resize-none relative bg-[#F5F5F5]"
            onKeyUp={onKeyDown}
            autoComplete="off"
            placeholder="메세지를 입력하세요."
            maxLength={300}
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
