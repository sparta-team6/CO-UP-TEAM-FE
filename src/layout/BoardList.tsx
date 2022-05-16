import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { Board, useGetBoard } from "../api/BoardQuery";
import Bucket from "../Components/ToolBoard/Bucket";
import { BoardState, ProjectKey } from "../recoil/Atoms";

const BoardList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board } = useGetBoard(String(pjId));
  const [test, setTest] = useRecoilState(BoardState);
  useEffect(() => {
    setTest(board?.data);
  }, [board]);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setTest((allBoards: any) => {
        const boardCopy = [...allBoards[Number(source.droppableId)].cards];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(Number(source.index), 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log(boardCopy);
        return {
          ...allBoards,
          [Number(source.droppableId)]: boardCopy,
        };
      });
    }
    /* 다른 버킷으로 이동 */
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setTest((allBoards: any) => {
        const sourceBoard = [...allBoards[Number(source.droppableId)].cards];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[Number(destination.droppableId)].cards];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  console.log(test);
  return (
    <div className="w-full h-full bg-slate-200 overflow-auto">
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

export default BoardList;
