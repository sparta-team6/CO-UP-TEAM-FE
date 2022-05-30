import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { content } from "./Chat";
import { useRecoilValue } from "recoil";
import { MyProfile } from "../recoil/MyProfile";
import EmptyChat from "../images/Main/EmptyChat.png";
import { SweetAlertHook } from "../servers/Sweet";
import { queryClient } from "..";

interface ChatPresenterProps {
  senderLoginId: string;
  pjId: string;
  contents: Array<content>;
  setPageParams: Dispatch<SetStateAction<number>>;
  pageParams: number;
}

interface IForm {
  senderLoginId: string;
  message: string;
  pjId: string;
  profileImage: string;
  nickname: string;
}

const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);
const ChatPre = ({
  contents,
  senderLoginId,
  pjId,
  pageParams,
  setPageParams,
}: ChatPresenterProps) => {
  const { nickname, profileImage, loginId } = useRecoilValue(MyProfile);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleonEnter: SubmitHandler<IForm> = ({ message }) => {
    if (message.trim() === "") return;
    if (send === true) {
      SweetAlertHook(1000, "error", "😡 도배 금지 😡");
      setValue("message", "");
      return;
    }
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
  const [send, setSend] = useState(false);
  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      setSend(false);
    }, 500);
  }, [contents]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const data = { text: e.currentTarget.value };
    const newMessage = {
      message: data.text,
      senderLoginId: String(senderLoginId),
      pjId,
      profileImage: String(profileImage),
      nickname: String(nickname),
    };
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        setSend(true);
        handleonEnter(newMessage);
      }
    }
  };
  const onScroll = () => {
    setPageParams(pageParams + 20);
  };
  return (
    <>
      <div
        ref={messageBoxRef}
        className="w-full h-full space-y-[24px] overflow-y-auto flex flex-col-reverse items-center pb-3"
      >
        {contents?.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center">
            <img src={EmptyChat} alt="" />
            <span className="pt-[41px] text-[#B0B0B0]">팀원들에게 메세지를 전달해보세요</span>
          </div>
        ) : null}
        {contents?.map((box, index) => {
          return (
            <div
              className={`w-[366px] min-h-10 first:mt-[24px] flex ${
                loginId === box.senderLoginId ? "justify-end" : "justify-start"
              }`}
              key={index}
            >
              <img
                width={36}
                height={36}
                className={`min-w-[36px] min-h-[36px] -mt-2 rounded-full ${
                  loginId === box.senderLoginId ? "hidden" : ""
                }`}
                src={box.profileImage}
                alt=""
              />
              <div className={`flex flex-col pl-[10px] `}>
                <span
                  className={`font-bold text-lg pb-1 ${
                    loginId === box.senderLoginId ? "hidden" : ""
                  }`}
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
                    className={`min-w-[25px] min-h-[40px] bg-[#f5f5f5] dark:bg-[#3D4853] p-[10px] rounded-md`}
                  >
                    <span
                      className={`whitespace-pre-wrap break-all mt-2 leading-5 text-sm text-[#666666] dark:text-[#B0B0B0] font-normal tracking-tight`}
                    >
                      {box.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div onClick={onScroll} className="w-full h-4 bg-1">
          더보기
        </div> */}
      </div>
      <div className="w-full flex justify-center items-center relative bg-[#fff] dark:bg-6">
        <form
          className="w-[384px] h-[120px] mb-7 bg-slate-200 outline-none flex items-center justify-center rounded-xl"
          onSubmit={handleSubmit(handleonEnter)}
        >
          <textarea
            className="w-full h-full p-[18px] rounded-xl border-[#E7EBF2] dark:text-white dark:border dark:border-[#666] outline-none resize-none relative bg-[#F5F5F5] dark:bg-[#3D4853] dark:placeholder:text-[#B0B0B0]"
            onKeyUp={onKeyDown}
            autoComplete="off"
            placeholder="메세지를 입력하세요."
            maxLength={300}
            {...register("message")}
          />
          <button
            className="w-[56px] h-[36px] absolute right-9 bottom-10 text-white hover:bg-h1 bg-3 rounded-[4px]"
            type="submit"
          >
            전송
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPre;
