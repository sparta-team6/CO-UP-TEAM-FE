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
  const messageBoxRef = useRef<HTMLUListElement>(null);
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
    <div className="w-full h-[calc(100vh-150px)] flex flex-col justify-end absolute top-16">
      <div className="flex fixed top-0 left-0 h-full z-[45]">
        <div className="hidden sm:block sm:w-screen">
          <SlidingPanel type={"left"} isOpen={open} size={100}>
            <div onClick={onClick} className="flex">
              <MyProjectList />
            </div>
          </SlidingPanel>
        </div>
      </div>
      <div
        className={`w-full h-full flex flex-col justify-end absolute ${open ? "z-40" : "z-[49]"}`}
      >
        <ul ref={messageBoxRef} className="w-full h-full sm:min-h-[612px] space-y-2 overflow-auto">
          {data?.data?.map((box, index) => {
            return (
              <li className="w-full min-h-[80px] pl-[26px] flex items-start" key={index}>
                <img className="w-9 h-9 rounded-full" src={box.profile} alt="" />
                <div className="flex flex-col pl-[10px]">
                  <span className="font-bold text-lg">{box.name}</span>
                  <span className="text-[#AAA] text-xs">{box.createAt}</span>
                  <span className="whitespace-pre-wrap break-all mt-2">{box.comment}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`w-full h-[86px] fixed bottom-0 ${open ? "z-30" : "z-[46]"}`}>
        <form className="w-full h-full outline-none " onSubmit={handleSubmit(handleonEnter)}>
          <textarea
            className="fixed w-full h-full pl-[32px] pt-[20px] text-[#B0B0B0] bg-[#F5F5F5] outline-none resize-none"
            onKeyDown={onKeyDown}
            {...(register("text"), { placeholder: "메세지를 입력하세요." })}
          />
          <button
            className="w-[52px] h-[33px] absolute bottom-10 right-5 text-white bg-3 rounded-[4px]"
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
