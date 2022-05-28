import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { useGetCardDetail } from "../../api/CardQuery";
import { useUpdateCards } from "../../api/Optimistic";
import { useGetProjectUser } from "../../api/UserQuery";
import { ProjectKey } from "../../recoil/RoomID";

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
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "카드 수정 완료😊",
      });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                autoFocus
                className="w-full text-3xl sm:text-lg font-semibold mb-2 rounded-md border-none"
                {...register("title")}
                defaultValue={toDoTitle}
                maxLength={25}
              />
              <div className="w-full flex items-center space-x-3">
                <div className="max-w-xs h-7 rounded-sm flex justify-center items-center">
                  <select
                    className="outline-none bg-slate-200 border-0 rounded-md w-[120px] h-7 text-center"
                    value={name}
                    onChange={onChange}
                  >
                    <option defaultValue="none">{Card?.data.managerNickname}</option>
                    {result?.map((member, index) => {
                      return (
                        <option key={index} value={`${member.loginId} ${member.nickname}`}>
                          {member.nickname}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full max-h-64 py-8">
                <textarea
                  autoFocus
                  className="w-full h-[200px] rounded-md border-none resize-none outline-none"
                  {...register("text")}
                  defaultValue={toDoText}
                  maxLength={500}
                />
              </div>
              <button
                className="w-16 h-9 absolute bottom-[15px] right-5 sm:right-0 sm:bottom-0 rounded-md text-base text-white bg-3"
                type="submit"
              >
                <span>수정</span>
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
