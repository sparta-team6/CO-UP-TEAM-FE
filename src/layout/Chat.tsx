import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "..";
import { useAddChatComment, useGetChatComment } from "../api/ChatQuery";
import { MyProfile } from "../recoil/MyProfile";

interface IForm {
  text: string;
}

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
      profile: String(user.profileImage),
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
    <div className="w-[432px] h-[calc(100%-4rem)] bg-white flex flex-col justify-end absolute top-16 right-0 border-l border-[#C1C1C1] border-solid md:hidden">
      <div ref={messageBoxRef} className="w-full h-full space-y-2 overflow-y-auto">
        {data?.data?.map((box, index) => {
          return (
            <div className="w-[370px] min-h-10 pl-8 flex items-start" key={index}>
              <img className="w-[40px] h-[40px] rounded-full" src={box.profile} alt="" />
              <div className="flex flex-col pl-2 pt-1 pb-2">
                <span className="font-bold text-lg">{box.name}</span>
                <span className="text-[#AAA] text-xs">{box.createAt}</span>
                <span className="whitespace-pre-wrap break-all mt-2 leading-5">{box.comment}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center relative bg-white">
        <form
          className="w-[386px] h-[120px] mb-7 bg-slate-200 outline-none flex items-center justify-center rounded-lg"
          onSubmit={handleSubmit(handleonEnter)}
        >
          <textarea
            className="w-[380px] h-24 p-2 outline-none resize-none relative bg-transparent"
            onKeyDown={onKeyDown}
            {...(register("text"), { placeholder: "메세지를 입력하세요." })}
          />
          <button
            className="w-12 h-7 absolute right-8 bottom-10 text-white bg-3 rounded-[4px] leading-7"
            type="submit"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
