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
  index: number;
}

const DraggableCard = ({
  bucketId,
  toDoName,
  toDoId,
  toDoText,
  toDoTitle,
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
      title: "삭제",
      text: "진짜 삭제하시겠어요?!!",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
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
              className={`relative h-24 overflow-hidden min-w-[256px] mb-2 rounded-md bg-white`}
            >
              <div
                className={`w-[10px] h-full ${
                  bucketId === "대기" ? "bg-[#c4c4c4]" : bucketId === "완료" ? "bg-3" : "bg-1"
                }  absolute top-0`}
              />

              <div className="w-full h-full pl-6 flex flex-col justify-center space-y-8 font-semibold">
                <span className="font-NeoB">{toDoTitle}</span>
                <span className="font-NeoL">{toDoName}</span>
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
              className="w-[704px] h-[384px] rounded-xl sm:w-[320px] sm:min-h-[192px] relative"
            >
              <div className="w-full h-full p-6">
                <span className="text-lg sm:text-xl font-semibold text-[32px] mb-2">
                  {toDoTitle}
                </span>
                <div className="w-full flex sm:flex-col sm:items-start sm:space-y-1 sm:mt-2 items-center lg:space-x-2 mt-7 ">
                  <span className="text-xl sm:text-sm mr-1">2022.XX.XX</span>
                  <div className="text-xl sm:text-sm w-[50px] h-7 rounded-md bg-5 flex justify-center items-center">
                    <span>{bucketId}</span>
                  </div>
                  <div className="text-xl sm:text-sm min-w-[80px] h-7 rounded-md bg-5 flex px-2 justify-center items-center">
                    <span>{toDoName}</span>
                  </div>
                </div>
                <div className="max-h-64 py-8 sm:py-4 text-lg">
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
