import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "..";
import { useAddChatComment, useGetChatComment } from "../api/ChatQuery";
import { MyProfile } from "../recoil/Atoms";

type IForm = {
  text: string;
};

const Chat = () => {
  const { data } = useGetChatComment();
  const { mutateAsync } = useAddChatComment();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const user = useRecoilValue(MyProfile);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [data]);
  const handleonEnter: SubmitHandler<IForm> = ({ text }) => {
    mutateAsync({
      createAt: Date.now(),
      name: user.nickname,
      profile: user.profileImage,
      comment: text,
    }).then(() => {
      queryClient.invalidateQueries("getChat");
      setValue("text", "");
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const text = { text: e.currentTarget.value };
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        handleonEnter(text);
      }
    }
  };

  return (
    <div className="w-96 h-[calc(100%-10rem)] flex flex-col justify-end absolute top-12 right-0 md:hidden ">
      <div ref={messageBoxRef} className="w-full h-full space-y-2 overflow-y-auto">
        {data?.data?.map((box, index) => {
          return (
            <div className="w-full min-h-10 p-1 flex items-center" key={index}>
              <img width="30px" height="30px" src={box.profile} alt="" />
              <span>{box.name}</span>
              <span className="whitespace-pre-wrap break-all">{box.comment}</span>
              <span className="text-xs">{box.createAt}</span>
            </div>
          );
        })}
      </div>
      <div className="w-96 h-36 fixed bottom-0">
        <div className="w-full h-full flex justify-center ">
          <form
            className="w-[340px] h-32 bg-slate-200 outline-none flex items-center justify-center rounded-lg"
            onSubmit={handleSubmit(handleonEnter)}
          >
            <textarea
              className="w-80 h-28 outline-none resize-none relative bg-transparent"
              onKeyDown={onKeyDown}
              {...(register("text"), { placeholder: "메세지를 입력하세요." })}
            />
            <button
              className="w-12 h-7 fixed bottom-6 right-10  text-white bg-3 rounded-[4px] leading-7"
              type="submit"
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
