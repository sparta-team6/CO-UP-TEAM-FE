import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodo, MyProfile, ProjectKey, toDoState } from "../../recoil/Atoms";
import DraggableCard from "../../elements/ToolBoard/DraggableCard";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import { useGetBoard, usePostCard } from "../../api/BoardQuery";
import { queryClient } from "../..";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

interface IBoardProps {
  toDos: ITodo[];
  bucketId: string;
}

interface IForm {
  toDo: string;
  toDoComment: string;
}

const Bucket = ({ toDos, bucketId }: IBoardProps) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { nickname } = useRecoilValue(MyProfile);
  const { data: board } = useGetBoard(String(pjId));
  console.log(board);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const { mutateAsync } = usePostCard();
  const onClick = () => {
    const bucket = {
      pjId: String(pjId),
      title: "rr",
      position: 3,
    };
    mutateAsync(bucket)
      .then(() => {
        console.log(bucket);
        queryClient.invalidateQueries("getBoard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onValid = ({ toDo, toDoComment }: IForm) => {
    if (name === "") {
      alert("담당자 선택해주세요");
      return;
    }
    const newToDo = {
      id: Date.now(),
      text: toDo,
      comment: toDoComment,
      name: name,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [bucketId]: [newToDo, ...allBoards[bucketId]],
      };
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
    <div className="w-72 rounded-md min-h-[800px] flex flex-col">
      <div onClick={onClick}>테스트 보내기</div>
      <div className="w-full h-6 mt-10 flex justify-between">
        <h2 className="text-center font-semibold text-lg">{bucketId}</h2>
        <button
          className="h-full border-none bg-transparent flex items-center"
          onClick={handleOpen}
        >
          <span className=" text-2xl text-black">+</span>
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
          <form className="w-full h-full relative space-y-4" onSubmit={handleSubmit(onValid)}>
            <input
              className="w-full outline-none border-none placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("toDo")}
              type="text"
              placeholder="보드의 제목을 적어주세요 :)"
            />
            <div className="w-full flex items-center space-x-4">
              <div className="w-14 bg-slate-200 text-base font-semibold">
                <p className="text-center">{bucketId}</p>
              </div>
              {/* <select
                className="outline-none bg-slate-200 border-0"
                value={name}
                onChange={onChange}
              >
                <option defaultValue="none">=== 선택 ===</option>
                {user?.data?.map((member, index) => {
                  return (
                    <option key={index} value={member.nickname}>
                      {member.nickname}
                    </option>
                  );
                })}
                <option value={nickname}>{nickname}</option>
              </select> */}
              <select
                className="outline-none bg-slate-200 border-0"
                value={name}
                onChange={onChange}
              >
                <option defaultValue="none">=== 선택 ===</option>
                <option value={nickname}>{nickname}</option>
                <option value={nickname}>{nickname}</option>
              </select>
            </div>
            <input
              className="w-full outline-none border-none"
              {...register("toDoComment")}
              type="text"
              placeholder="내용입력"
            />
            <button className="w-[150px] absolute bottom-0 right-0" type="submit">
              등록하기
            </button>
          </form>
        </Box>
      </Modal>
      <Droppable droppableId={bucketId}>
        {(magic, info) => (
          <div
            className={`${
              info.isDraggingOver
                ? "bg-blue-600"
                : info.draggingFromThisWith
                ? "bg-red-600"
                : "bg-transparent"
            } min-h-[500px] mt-3 rounded-sm w-full flex flex-col transition-colors ease-in-out delay-300`}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              /* dnd는 key draggableId가 같아야함 */
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                toDoName={toDo.name}
                toDoComment={toDo.comment}
                bucketId={bucketId}
              />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Bucket;
