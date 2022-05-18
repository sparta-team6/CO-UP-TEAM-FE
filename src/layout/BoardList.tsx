/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { Board, useGetBoard, useUpdateCards } from "../api/BoardQuery";
import Bucket from "../Components/ToolBoard/Bucket";
import { ProjectKey } from "../recoil/Atoms";

const BoardList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board } = useGetBoard(String(pjId));
  const { mutateAsync } = useUpdateCards(pjId);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      const boardCopy = [...board?.data[Number(source.droppableId)].cards];
      const ThisKbbId = board?.data[Number(source.droppableId)].kbbId;
      const taskObj = boardCopy[source.index];
      boardCopy.splice(Number(source.index), 1);
      boardCopy.splice(destination?.index, 0, taskObj);
      console.log(destination, source);
      console.log(taskObj);
      console.log(ThisKbbId);
      console.log(boardCopy);
      const post = {
        kbcId: taskObj.kbcId,
        kbbId: taskObj.kbbId,
        title: taskObj.title,
        manager: taskObj.manager,
        contents: taskObj.contents,
        position: destination.index,
      };
      mutateAsync(post)
        .then(() => {
          console.log(post);
        })
        .catch((res) => {
          console.log(res);
        });
    }
    if (destination.droppableId !== source.droppableId) {
      const sourceBoard = [...board?.data[Number(source.droppableId)].cards];
      const StartKbbId = board?.data[Number(source.droppableId)].kbbId;
      const taskObj = sourceBoard[source.index];
      const destinationBoard = [...board?.data[Number(destination.droppableId)].cards];
      const LastKbbId = board?.data[Number(destination.droppableId)].kbbId;
      sourceBoard.splice(source.index, 1);
      destinationBoard.splice(destination?.index, 0, taskObj);
      console.log(destination, source);
      console.log(StartKbbId, LastKbbId);
      console.log(sourceBoard, destinationBoard);
      const post = {
        kbcId: taskObj.kbcId,
        kbbId: String(LastKbbId),
        title: taskObj.title,
        manager: taskObj.manager,
        contents: taskObj.contents,
        position: destination.index,
      };
      mutateAsync(post)
        .then(() => {
          console.log(post);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div className="w-full h-full bg-slate-100 overflow-auto">
      <div className="w-full h-full flex justify-center items-center relative">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full h-full flex">
            <div className="flex justify-around items-start w-full gap-2 md:justify-start">
              {board?.data.map((bucketId: Board, index: number) => {
                return (
                  <Bucket
                    kbbId={bucketId.kbbId}
                    bucketId={bucketId.title}
                    key={bucketId.title}
                    toDos={bucketId.cards}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default React.memo(BoardList);
