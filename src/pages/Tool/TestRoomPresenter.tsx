import { content } from "./TestRoom";
import { SubmitHandler, useForm } from "react-hook-form";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

type ChatPresenterProps = {
  messages: Array<content>;
  senderLoginId: string;
  pjId: string;
  contents: Array<content>;
};

interface IForm {
  message: string;
}

const sockJS = new SockJS(`${process.env.REACT_APP_API_URL}ws`);
const stompClient: Stomp.Client = Stomp.over(sockJS);

export const ChatPresenter = ({ contents, senderLoginId, pjId }: ChatPresenterProps) => {
  const { register, handleSubmit } = useForm<IForm>();
  const onValid: SubmitHandler<IForm> = (data) => {
    const newMessage = { message: data.message, senderLoginId, pjId };
    console.log(newMessage);
    stompClient.send("/pub/chatting/project", {}, JSON.stringify(newMessage));
  };
  return (
    <div className="w-[300px] border">
      <div className="h-[400px]">
        {contents?.map((content, index) => (
          <div key={index}>
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
