import { content } from "./TestRoom";
import { SubmitHandler, useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { queryClient } from "../..";

type ChatPresenterProps = {
  messages: Array<content>;
  senderLoginId: string;
  pjId: string;
};

interface IForm {
  message: string;
}

const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);

export const ChatPresenter = ({ messages, senderLoginId, pjId }: ChatPresenterProps) => {
  const { register, handleSubmit } = useForm<IForm>();
  const onValid: SubmitHandler<IForm> = (data) => {
    console.log(data.message, senderLoginId, pjId);
    const newMessage = { message: data.message, senderLoginId, pjId };
    console.log(newMessage);
    stompClient.send("/pub/chatting/project", {}, JSON.stringify(newMessage));
    queryClient.invalidateQueries("getChatting");
  };
  return (
    <div className="w-[300px] border">
      <div className="h-[400px]">
        {messages.map((content, index) => (
          <div key={index}>
            {" "}
            {content.senderLoginId} : {content.message}{" "}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input placeholder="메세지를 입력하세요 :)" {...register("message")} />
          <button>전송</button>
        </form>
      </div>
    </div>
  );
};
