import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { content } from "../../Components/Mobile/MobileChatCom";

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
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleonEnter: SubmitHandler<IForm> = ({ message }) => {
    const newMessage = { message: message, senderLoginId, pjId };
    stompClient.send("/pub/chatting/project", {}, JSON.stringify(newMessage));
    setValue("message", "");
  };
  const messageBoxRef = useRef<HTMLUListElement>(null);
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
      <div className={`w-full h-full flex flex-col justify-end absolute "z-[49]"`}>
        <ul
          ref={messageBoxRef}
          className="w-full h-full sm:min-h-[612px] space-y-2 overflow-auto flex flex-col-reverse"
        >
          {contents?.map((box, index) => {
            return (
              <li className="w-full min-h-[80px] pl-[26px] flex items-start" key={index}>
                {/* <img className="w-9 h-9 rounded-full" src={box.profile} alt="" /> */}
                <div className="flex flex-col pl-[10px]">
                  <span className="font-bold text-lg">{box.senderLoginId}</span>
                  <span className="text-[#AAA] text-xs">{box.pjId}</span>
                  <span className="whitespace-pre-wrap break-all mt-2">{box.message}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full h-[86px] bg-[#F5F5F5] fixed bottom-0 z-[50]">
        <form
          className="w-full h-full outline-none flex items-end"
          onSubmit={handleSubmit(handleonEnter)}
        >
          <input
            className="w-full h-[86px] pl-[32px] pt-[20px] text-[#B0B0B0] bg-[#F5F5F5] outline-none resize-none border-0"
            // onKeyDown={onKeyDown}
            {...register("message")}
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
