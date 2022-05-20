import React, { useEffect, useRef } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useAddChatComment, useGetChatComment } from "../../api/ChatQuery";
import MyProjectList from "../../layout/MyProjectList";
import { HandleOpen } from "../../recoil/AtomsInterface";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState } from "recoil";
import { MyProfile } from "../../recoil/MyProfile";

interface IForm {
  text: string;
}

const MobileChatCom = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setOpen(false);
  }, []);
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
    <div className="w-full h-[calc(100%-20rem)] flex flex-col justify-end absolute bottom-48 right-0">
      <div className="flex fixed top-0 left-0 mt-16 h-full z-40">
        <div className="hidden sm:block sm:w-screen">
          <SlidingPanel type={"left"} isOpen={open} size={100}>
            <div onClick={onClick} className="flex">
              <MyProjectList />
            </div>
          </SlidingPanel>
        </div>
      </div>
      <div className="w-full h-full  flex flex-col justify-end absolute top-0 right-0 z-50">
        <div
          ref={messageBoxRef}
          className="w-full min-h-[715px] bg-gray-200 space-y-2 overflow-auto"
        >
          {data?.data?.map((box, index) => {
            return (
              <div className="w-full min-h-10 p-1 flex items-center" key={index}>
                <img className="w-[30px] h-[30px] rounded-full" src={box.profile} alt="" />
                <span className="font-bold text-lg">{box.name}</span>
                <span className="text-[#AAA] text-xs">{box.createAt}</span>
                <span className="whitespace-pre-wrap break-all">{box.comment}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`w-full h-28 fixed bottom-20 bg-gray-300 ${open ? "z-30" : "z-40"}`}>
        <form className="w-full h-full outline-none " onSubmit={handleSubmit(handleonEnter)}>
          <textarea
            className="w-full h-full outline-none resize-none"
            onKeyDown={onKeyDown}
            {...register("text")}
          />
          <button
            className="w-12 h-7 absolute bottom-4 right-2 text-white bg-3 rounded-[4px] leading-7"
            type="submit"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileChatCom;
