import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, Modal } from "@mui/material";
import { useDeleteCards } from "../../api/BoardQuery";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";
import { queryClient } from "../..";
import { Trash2 } from "../Icon/Trash2";
import { SvgEdit2 } from "../Icon/SvgEdit2";
import EditCard from "./EditCard";

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
  console.log(bucketId, toDoName, toDoId, toDoText, toDoTitle, index);
  const { pjId } = useRecoilValue(ProjectKey);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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
              className={`relative h-24 overflow-hidden ${
                info.isDragging ? "bg-lime-400 shadow-2xl" : "bg-white"
              }  w-80 mt-2 rounded-md bg-white`}
            >
              <div
                className={`w-2 h-full ${
                  bucketId === "대기" ? "bg-1" : bucketId === "완료" ? "bg-3" : "bg-2"
                }  absolute top-0`}
              />

              <div className="w-full h-full pl-4 flex flex-col justify-around">
                <span className="font-NeoB">{toDoTitle}</span>
                <span className="font-NeoL">{toDoName}</span>
              </div>
            </div>
            <div
              onClick={onDelete}
              className={`${info.isDragging ? "hidden" : ""} absolute top-2 right-2 cursor-pointer`}
            >
              <Trash2 />
            </div>
            <div
              onClick={handleOpen}
              className={`${info.isDragging ? "hidden" : ""} absolute top-2 right-6 cursor-pointer`}
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
            <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
              <span>{toDoTitle}</span>
              <span>{toDoText}</span>
              <span>{toDoName}</span>
            </Box>
          </Modal>
          <EditCard
            open={open}
            close={handleClose}
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
