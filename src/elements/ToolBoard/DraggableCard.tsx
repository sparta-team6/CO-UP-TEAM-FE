import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, Modal } from "@mui/material";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { Trash2 } from "../Icon/Trash2";
import { SvgEdit2 } from "../Icon/SvgEdit2";
import EditCard from "./EditCard";
import { X } from "../Icon/X";
import { useDeleteCards } from "../../api/CardQuery";
import { ProjectKey } from "../../recoil/RoomID";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
};

interface IDragabbleCardProps {
  bucketId: string;
  toDoName: string;
  toDoId: string;
  toDoText: string;
  toDoTitle: string;
  toDoTime: string;
  index: number;
}

// 카드
const DraggableCard = ({
  bucketId,
  toDoName,
  toDoId,
  toDoText,
  toDoTitle,
  toDoTime,
  index,
}: IDragabbleCardProps) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const EditOpen = () => {
    setEdit(true);
  };
  const { mutateAsync } = useDeleteCards(toDoId);
  const onDelete = () => {
    Swal.fire({
      title: "카드를 삭제하시겠습니까?",
      text: "삭제된 카드는 복구되지 않습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        mutateAsync().then(() => {
          queryClient.invalidateQueries(["getBoard", pjId]);
        });
      }
    });
  };
  return (
    <Draggable draggableId={toDoId} index={index}>
      {(magic, info) => (
        <React.Fragment>
          <div
            className="relative"
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            <div
              onClick={handleOpen}
              className={`relative h-24 overflow-hidden min-w-[256px] mb-2 rounded-md bg-[#ffffff] dark:bg-6`}
            >
              <div
                className={`w-[10px] h-full ${
                  bucketId === "대기" ? "bg-[#c4c4c4]" : bucketId === "완료" ? "bg-3" : "bg-1"
                }  absolute top-0`}
              />

              <div className="w-full h-full pl-6 flex flex-col justify-center space-y-8 font-bold">
                <span className="w-[75%] pt-[4px] sm:w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {toDoTitle}
                </span>
                <span>{toDoName}</span>
              </div>
            </div>
            <div
              onClick={onDelete}
              className={`${
                info.isDragging ? "hidden" : ""
              } w-7 h-7 group absolute top-2 right-3 cursor-pointer flex justify-center items-center`}
            >
              <Trash2 />
            </div>
            <div
              onClick={EditOpen}
              className={`${
                info.isDragging ? "hidden" : ""
              } w-7 h-7 group absolute top-2 right-10 cursor-pointer flex justify-center items-center`}
            >
              <SvgEdit2 />
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              className="w-[696px] h-[376px] rounded-xl sm:w-[320px] sm:min-h-[192px] relative pb-[15px] px-[30px] pt-[28px]"
            >
              <div className="w-full h-full">
                <span className="text-lg sm:text-xl font-semibold text-[32px]">{toDoTitle}</span>
                <div className="w-full flex items-center space-x-2 mt-[28px] ">
                  <span className="text-xl sm:text-sm mr-1">
                    {toDoTime.replaceAll("-", ".").slice(0, 10)}
                  </span>
                  <div className="text-basesm:text-sm w-[50px] h-7 rounded-md bg-5 flex justify-center items-center">
                    <div className="mt-[3px] text-base">{bucketId}</div>
                  </div>
                  <div className="text-base sm:text-sm min-w-[80px] h-7 rounded-md bg-5 flex px-2 justify-center items-center">
                    <div className="mt-[3px] text-base">{toDoName}</div>
                  </div>
                </div>
                <div className="max-h-64 pt-4 pb-8 sm:py-4 text-lg">
                  <span>{toDoText}</span>
                </div>
              </div>
              <div onClick={handleClose} className="absolute top-5 right-5 cursor-pointer">
                <X />
              </div>
            </Box>
          </Modal>
          <EditCard
            edit={edit}
            setEdit={setEdit}
            toDoTitle={toDoTitle}
            toDoText={toDoText}
            toDoId={toDoId}
          />
        </React.Fragment>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
