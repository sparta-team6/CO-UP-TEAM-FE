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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
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
    mutateAsync().then(() => {
      alert("삭제완료");
      queryClient.invalidateQueries(["getBoard", pjId]);
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
              className={`relative h-24 overflow-hidden w-80 mt-2 rounded-md bg-white`}
            >
              <div
                className={`w-2 h-full ${
                  bucketId === "대기" ? "bg-[#e7ebfe]" : bucketId === "완료" ? "bg-3" : "bg-1"
                }  absolute top-0`}
              />

              <div className="w-full h-full pl-4 flex flex-col justify-around">
                <span className="font-NeoB">{toDoTitle}</span>
                <span className="font-NeoL">{toDoName}</span>
              </div>
            </div>
            <div
              onClick={onDelete}
              className={`${info.isDragging ? "hidden" : ""} absolute top-4 right-3 cursor-pointer`}
            >
              <Trash2 />
            </div>
            <div
              onClick={EditOpen}
              className={`${info.isDragging ? "hidden" : ""} absolute top-4 right-8 cursor-pointer`}
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
            <Box sx={style} className="w-[896px] h-[528px] rounded-xl sm:w-full relative">
              <div className="w-full h-full p-4">
                <h1 className="text-3xl font-semibold mb-4">{toDoTitle}</h1>
                <div className="w-full flex items-center space-x-3">
                  <span className="mr-4">2022.XX.XX</span>
                  <div className="w-[84px] h-7 rounded-sm bg-[#E7EBF2] flex justify-center items-center">
                    <span>{bucketId}</span>
                  </div>
                  <div className="max-w-xs h-7 rounded-sm bg-[#E7EBF2] flex px-2 justify-center items-center">
                    <span>{toDoName}</span>
                  </div>
                </div>
                <div className="max-h-64 py-8">
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
            toDoName={toDoName}
            toDoId={toDoId}
          />
        </React.Fragment>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
