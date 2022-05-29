import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import DraggableCard from "../../elements/ToolBoard/DraggableCard";
import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { queryClient } from "../..";
import { Cards, usePostCards } from "../../api/CardQuery";
import { ProjectKey } from "../../recoil/RoomID";
import { useGetProjectUser } from "../../api/UserQuery";
import Swal from "sweetalert2";
import { SweetAlertHook } from "../../servers/Sweet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
};

interface IBoardProps {
  toDos: Cards[];
  bucketId: string;
  kbbId: string;
  index: number;
  boardOpen: boolean;
  isFetching: boolean;
}

interface IForm {
  toDo: string;
  toDoComment: string;
}

const Bucket = ({ toDos, bucketId, kbbId, index, boardOpen, isFetching }: IBoardProps) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const { mutateAsync } = usePostCards();
  const { data: user } = useGetProjectUser(pjId);
  const onValid = ({ toDo, toDoComment }: IForm) => {
    if (name === "" || name === "담당자 선택") {
      alert("담당자 선택해주세요");
      return;
    }
    if (toDo.trim() === "") {
      SweetAlertHook(1000, "error", "제목을 입력해주세요😕");
      return;
    }
    const info = name.split(" ");
    const newToDo = {
      kbbId,
      title: toDo,
      contents: toDoComment,
      manager: info[0],
      managerNickname: info[1],
    };
    mutateAsync(newToDo).then(() => {
      queryClient.invalidateQueries(["getBoard", pjId]);
    });
    setValue("toDo", "");
    setValue("toDoComment", "");
    setOpen(false);
    setName("");
  };
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
  };
  return (
    <div className="min-w-[280px] sm:max-w-[247px] w-96 lg:mr-7 rounded-md min-h-[870px] flex flex-col sm:ml-[10px]">
      <div className="w-full h-6 mt-10 sm:mt-10 flex justify-between">
        <span className="text-center font-bold text-lg">{bucketId}</span>
        <button
          className="h-full border-none bg-transparent flex items-center"
          onClick={handleOpen}
        >
          <span className="text-2xl font-bold text-[#000000] dark:text-[#ffffff]">+</span>
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-[696px] h-[376px] rounded-xl sm:w-[320px] sm:min-h-[192px]  pb-[15px] px-[30px] pt-[28px]"
        >
          <form className="w-full h-full relative space-y-[15px]" onSubmit={handleSubmit(onValid)}>
            <input
              autoFocus
              className="w-full outline-none border-none placeholder:text-[#B0B0B0] placeholder:font-semibold text-2xl font-semibold"
              {...register("toDo")}
              type="text"
              maxLength={25}
              placeholder="보드 제목을 작성해주세요"
            />
            <div className="w-full flex items-center space-x-2">
              <div className="w-[78px] h-7 bg-slate-200 text-base rounded-md flex justify-center items-center">
                <div className="leading-[21px]">{bucketId}</div>
              </div>
              <select
                className="outline-none bg-slate-200 border-0 w-[162px] h-7 text-center rounded-md"
                value={name}
                onChange={onChange}
              >
                <option defaultValue="none">담당자 선택</option>
                {user?.data?.map((member, index) => {
                  return (
                    <option key={index} value={`${member.loginId} ${member.nickname}`}>
                      {member.nickname}
                    </option>
                  );
                })}
              </select>
            </div>
            <textarea
              className="pt-[15px] w-full h-[200px] placeholder:text-[#B0B0B0] outline-none border-none resize-none"
              {...register("toDoComment")}
              maxLength={500}
              placeholder="내용입력"
            />
            <button
              className="w-16 h-9 absolute bottom-[15px] right-[70px] sm:bottom-0 rounded-md text-base bg-3 text-white leading-[21px]"
              type="submit"
            >
              등록
            </button>
            <button
              onClick={handleClose}
              className="w-16 h-9 absolute bottom-[15px] right-0 sm:bottom-0 rounded-md text-base bg-5 leading-[21px]"
              type="submit"
            >
              닫기
            </button>
          </form>
        </Box>
      </Modal>
      {!isFetching && (
        <Droppable droppableId={String(index)}>
          {(magic, info) => (
            <div
              className={`${
                info.isDraggingOver
                  ? "bg-gray-200"
                  : info.draggingFromThisWith
                  ? "bg-gray-100"
                  : "bg-[#E7EBF2] dark:bg-7"
              } ${
                boardOpen ? "bg-transparent" : "bg-[#E7EBF2] dark:bg-7"
              } lg:overflow-y-scroll lg:overflow-x-hidden lg:h-[750px] sm:h-auto md:min-h-[600px] p-2 mt-3 rounded-lg w-full flex flex-col transition-colors ease-in-out delay-100`}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard
                  key={toDo.kbcId}
                  index={index}
                  toDoId={toDo.kbcId}
                  toDoText={toDo.contents}
                  toDoName={toDo.managerNickname}
                  toDoTitle={toDo.title}
                  bucketId={bucketId}
                />
              ))}
              {magic.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default React.memo(Bucket);
