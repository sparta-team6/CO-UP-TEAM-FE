import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, Modal } from "@mui/material";

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
  toDoComment: string;
  index: number;
}

const DraggableCard = ({
  bucketId,
  toDoName,
  toDoId,
  toDoText,
  toDoComment,
  index,
}: IDragabbleCardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Draggable draggableId={toDoId} index={index}>
      {(magic, info) => (
        <React.Fragment>
          <div
            onClick={handleOpen}
            className={`relative h-24 overflow-hidden ${
              info.isDragging ? "bg-lime-400 shadow-2xl" : "bg-white"
            }  w-80 mt-2 rounded-md bg-white`}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            <div
              className={`w-2 h-full ${
                bucketId === "to_do" ? "bg-1" : bucketId === "doing" ? "bg-2" : "bg-3"
              }  absolute top-0`}
            />
            <div className="absolute top-2 right-2 cursor-pointer">X</div>
            <div className="absolute top-2 right-6 cursor-pointer">Y</div>
            <div className="w-full h-full pl-4 flex flex-col justify-around">
              <span className="font-NeoB">{toDoText}</span>
              <span className="font-NeoL">{toDoName}</span>
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
              <span>{toDoText}</span>
              <span>{toDoName}</span>
              <span>{toDoComment}</span>
            </Box>
          </Modal>
        </React.Fragment>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
