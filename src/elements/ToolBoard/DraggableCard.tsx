import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, Modal } from "@mui/material";
import { useDeleteCards } from "../../api/BoardQuery";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";
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
  const { pjId } = useRecoilValue(ProjectKey);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { mutateAsync } = useDeleteCards("906e5b43-d5ec-48b1-badf-3104c54e091a");
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
          <div className="relative">
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
                  bucketId === "ToDo" ? "bg-1" : bucketId === "Done" ? "bg-3" : "bg-2"
                }  absolute top-0`}
              />
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
            <div className="absolute top-2 right-2 cursor-pointer">X</div>
            <div onClick={onDelete} className="absolute top-2 right-6 cursor-pointer">
              Y
            </div>
          </div>
        </React.Fragment>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
