import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetCardDetail, useUpdateCards } from "../../api/CardQuery";
import { ProjectKey } from "../../recoil/RoomID";

import { X } from "../Icon/X";

interface IPros {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  toDoName: string;
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
  p: 4,
};

const EditCard = ({ edit, setEdit, toDoName, toDoText, toDoTitle, toDoId }: IPros) => {
  const [name, setName] = useState("");
  const handleClose = () => setEdit(false);
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync } = useUpdateCards(pjId);
  const { data: Card } = useGetCardDetail(toDoId);
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    const post = {
      kbcId: String(Card?.data.kbcId),
      kbbId: String(Card?.data.kbbId),
      manager: name,
      title: data.title,
      contents: data.text,
      position: Number(Card?.data.position),
    };
    console.log(post);
    mutateAsync(post).then(() => {
      queryClient.invalidateQueries(["getCard", String(Card?.data.kbbId)]);
    });
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
        <Box sx={style} className="w-[896px] h-[528px] rounded-xl sm:w-full relative">
          <div className="w-full h-full p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="text-3xl font-semibold mb-4"
                {...register("title")}
                defaultValue={toDoTitle}
              />
              <div className="w-full flex items-center space-x-3">
                <div className="max-w-xs h-7 rounded-sm flex justify-center items-center">
                  <select
                    className="outline-none bg-slate-200 border-0"
                    value={name}
                    onChange={onChange}
                  >
                    <option defaultValue="none">=== 선택 ===</option>
                    <option value={toDoName}>{toDoName}</option>
                  </select>
                </div>
              </div>
              <div className="max-h-64 py-8">
                <input {...register("text")} defaultValue={toDoText} />
              </div>
              <button
                className="w-16 h-9 absolute bottom-5 right-5 rounded-md  font-semibold text-base bg-3 text-white"
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
