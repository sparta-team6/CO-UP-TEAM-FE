/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect } from "react";
import { DragDropContext, DropResult, resetServerContext } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { Board, useGetBoard, useUpdateCards } from "../api/BoardQuery";
import Bucket from "../Components/ToolBoard/Bucket";
import { ProjectKey } from "../recoil/Atoms";

const BoardList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board } = useGetBoard(String(pjId));
  const { mutateAsync } = useUpdateCards(pjId);
  useEffect(() => {
    resetServerContext();
  }, [board]);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      const boardCopy = [...board?.data[Number(source.droppableId)].cards];
      const taskObj = boardCopy[source.index];
      boardCopy.splice(Number(source.index), 1);
      boardCopy.splice(destination?.index, 0, taskObj);
      const post = {
        kbcId: taskObj.kbcId,
        kbbId: taskObj.kbbId,
        title: taskObj.title,
        manager: taskObj.manager,
        contents: taskObj.contents,
        position: destination.index,
      };
      mutateAsync(post);
    }
    if (destination.droppableId !== source.droppableId) {
      const sourceBoard = [...board?.data[Number(source.droppableId)].cards];
      const taskObj = sourceBoard[source.index];
      const destinationBoard = [...board?.data[Number(destination.droppableId)].cards];
      const LastKbbId = board?.data[Number(destination.droppableId)].kbbId;
      sourceBoard.splice(source.index, 1);
      destinationBoard.splice(destination?.index, 0, taskObj);
      const post = {
        kbcId: taskObj.kbcId,
        kbbId: String(LastKbbId),
        title: taskObj.title,
        manager: taskObj.manager,
        contents: taskObj.contents,
        position: destination.index,
      };
      mutateAsync(post);
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
        {/* {show ? (
          <div className="w-full h-[calc(100%-5rem)] bg-2 absolute top-20 flex justify-center items-center">
            <div className="w-[420px] h-[135px] space-y-4">
              <p className="text-center font-semibold text-4xl mb-4">새로운 보드를 추가해 보세요</p>
              <span className="text-center text-lg">
                <p>보드를 사용하여 팀원들과 현재 대기중인, 진행중인,</p>
                <p>완료된 보드의 작업 상태를 공유할 수 있습니다.</p>
              </span>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default BoardList;
