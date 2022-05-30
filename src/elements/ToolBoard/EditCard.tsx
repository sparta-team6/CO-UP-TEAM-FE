import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetCardDetail } from "../../api/CardQuery";
import { useUpdateCards } from "../../api/Optimistic";
import { useGetProjectUser } from "../../api/UserQuery";
import { ProjectKey } from "../../recoil/RoomID";
import { SweetAlertHook } from "../../servers/Sweet";

import { X } from "../Icon/X";

interface IPros {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  toDoText: string;
  toDoTitle: string;
  toDoId: string;
}

interface IForm {
  title: string;
  text: string;
  name: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
};

const EditCard = ({ edit, setEdit, toDoText, toDoTitle, toDoId }: IPros) => {
  const handleClose = () => setEdit(false);
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync } = useUpdateCards(pjId);
  const { data: Card } = useGetCardDetail(toDoId);
  const { data: user } = useGetProjectUser(pjId);
  const [name, setName] = useState(String(Card?.data.managerNickname));
  const { register, handleSubmit } = useForm<IForm>();
  const result = user?.data.filter((data) => data.nickname !== Card?.data.managerNickname);
  const onSubmit: SubmitHandler<IForm> = (data) => {
    if (name === "" || name === "담당자 선택") {
      alert("담당자 선택해주세요");
      return;
    }
    if (data.title.trim() === "") {
      SweetAlertHook(1000, "error", "제목을 입력해주세요😕");
      return;
    }
    const info = name.split(" ");
    const post = {
      kbcId: String(Card?.data.kbcId),
      kbbId: String(Card?.data.kbbId),
      manager: info.length === 1 ? String(Card?.data.manager) : info[0],
      managerNickname: info[1] === undefined ? String(Card?.data.managerNickname) : info[1],
      title: data.title,
      contents: data.text,
    };
    mutateAsync(post).then(() => {
      queryClient.invalidateQueries(["getCard", String(Card?.data.kbbId)]);
      SweetAlertHook(1000, "success", "카드 수정 완료😊");
    });
    setEdit(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
  };
  return (
    <div>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-[696px] h-[376px] rounded-xl sm:w-[320px] sm:min-h-[192px]  pb-[15px] px-[30px] pt-[28px]"
        >
          <div className="w-full h-full relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[15px]">
              <input
                autoFocus
                className="w-full text-3xl sm:text-lg font-medium rounded-md border-none"
                {...register("title")}
                defaultValue={toDoTitle}
                maxLength={25}
              />
              <div className="w-full flex items-center space-x-3">
                <div className="min-w-[162px] h-7 rounded-md flex justify-center items-center bg-slate-200">
                  <select
                    className="outline-none bg-transparent border-0 rounded-md w-[162px] h-7 text-center"
                    value={name}
                    onChange={onChange}
                  >
                    <option defaultValue="none" className="bg-slate-200 rounded-md">
                      {Card?.data.managerNickname}
                    </option>
                    {result?.map((member, index) => {
                      return (
                        <option
                          className="bg-slate-200"
                          key={index}
                          value={`${member.loginId} ${member.nickname}`}
                        >
                          {member.nickname}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full max-h-64 py-3">
                <textarea
                  className="w-full h-[200px] rounded-md border-none resize-none outline-none"
                  {...register("text")}
                  defaultValue={toDoText}
                  maxLength={500}
                />
              </div>
              <button
                className="w-16 h-9 absolute bottom-[8px] -right-3 sm:right-0 sm:bottom-0 rounded-md text-base text-white hover:bg-h1 bg-3"
                type="submit"
              >
                수정
              </button>
            </form>
          </div>
          <div onClick={handleClose} className="absolute top-5 right-5 cursor-pointer">
            <X />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCard;
