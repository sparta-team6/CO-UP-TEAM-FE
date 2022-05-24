import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ProjectKey } from "../../recoil/RoomID";

export interface message {
  username: string;
  content: string;
}

/* 기본 api url 주소 */
/* const sockJS = new SockJS("http://localhost:8080/webSocket");
const stompClient: Stomp.Client = Stomp.over(sockJS); */
// eslint-disable-next-line @typescript-eslint/no-empty-function
/* stompClient.debug = () => {}; */

const TestRoom = () => {
  const [contents, setContents] = React.useState<message[]>([]);
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { pjId } = useRecoilValue(ProjectKey);

  useEffect(() => {
    /*  stompClient.connect({}, () => {
      백엔드에서 설정한 pjId별 채팅 room 
      stompClient.subscribe(`/${pjId}`, (data) => {
        const newMessage: message = JSON.parse(data.body) as message;
        addMessage(newMessage);
      });
    }); */
  }, [contents]);

  const handleEnter = (username: string, content: string) => {
    const newMessage: message = { username, content };
    /* 백엔드에서 요청 post 보내는 api 주소 */
    /*  stompClient.send("/hello", {}, JSON.stringify(newMessage)); */
    setMessage("");
  };

  const addMessage = (message: message) => {
    setContents((prev) => [...prev, message]);
  };
  return (
    <div className="w-full h-screen bg-3 flex justify-center items-center">
      <div className="w-96 h-96 bg-4">
        hi
        {/* <ChatPresenter
          contents={contents}
          handleEnter={handleEnter}
          message={message}
          setMessage={setMessage}
          username={username}
          setUsername={setUsername}
        /> */}
      </div>
    </div>
  );
};

export default TestRoom;
