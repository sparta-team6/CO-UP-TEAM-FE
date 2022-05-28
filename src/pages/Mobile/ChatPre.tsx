import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { content } from "../../Components/Mobile/MobileChatCom";
import { MyProfile } from "../../recoil/MyProfile";
import EmptyChat from "../../images/Main/EmptyChat.png";

type ChatPresenterProps = {
  messages: Array<content>;
  senderLoginId: string;
  pjId: string;
  contents: Array<content>;
};

interface IForm {
  senderLoginId: string;
  message: string;
  pjId: string;
}

const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);

const MobileChatPre = ({ contents, senderLoginId, pjId }: ChatPresenterProps) => {
  const { nickname, profileImage, loginId } = useRecoilValue(MyProfile);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleonEnter: SubmitHandler<IForm> = ({ message }) => {
    if (message.length === 1) return;
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
      <div className={`w-full h-full flex flex-col justify-end absolute "z-[49]"`}>
        <div
          ref={messageBoxRef}
          className="w-full h-full sm:min-h-[612px] space-y-2 overflow-auto flex flex-col-reverse"
        >
          {contents?.map((box, index) => {
            return (
              <div
                className={`w-full min-h-10 first:my-4 pl-[26px] flex ${
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
                <div
                  className={`flex flex-col pl-[10px] ${
                    loginId === box.senderLoginId ? "text-right pr-[26px]" : ""
                  }`}
                >
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
                      className={`text-left min-w-[25px] sm:min-h-[40px] bg-[#f5f5f5] p-[10px] rounded-md ${
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
      </div>
      {contents?.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <img src={EmptyChat} alt="" />
          <span className="pt-[41px] text-[#B0B0B0]">팀원들에게 메세지를 전달해보세요</span>
        </div>
      ) : null}
      <div className="w-full h-[86px] bg-[#F5F5F5] fixed bottom-0 z-[50]">
        <form
          className="w-full h-full outline-none flex items-end"
          onSubmit={handleSubmit(handleonEnter)}
        >
          <textarea
            className="w-full h-[86px] pl-[32px] pt-[20px] text-[#B0B0B0] bg-[#F5F5F5] outline-none resize-none border-0"
            onKeyUp={onKeyDown}
            {...register("message")}
            autoComplete="off"
            placeholder="메세지를 입력하세요."
          />
          <button
            className="w-[52px] h-[33px] absolute bottom-5 right-5 text-white bg-3 rounded-[4px]"
            type="submit"
          >
            전송
          </button>
        </form>
      </div>
    </>
  );
};

export default MobileChatPre;
