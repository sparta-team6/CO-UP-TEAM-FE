import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import Bucket from "../Components/ToolBoard/Bucket";
import { toDoState } from "../recoil/Atoms";

const BoardList = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [notToDos, setNotToDos] = useState(false);
  useEffect(() => {
    const NotTodo = toDos["to_do"].length;
    setNotToDos(NotTodo === 0 ? true : false);
  }, [toDos]);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        /* 객체 안에서 키 값이 중복된 프로퍼티는 마지막에 선언된 프로퍼티를 사용 */
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    /* 다른 버킷으로 이동 */
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
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
  return (
    <div className="w-[calc(100%-23rem)] h-full bg-slate-200 overflow-auto md:w-[calc(100%-3rem)]">
      <div className="w-full h-full flex justify-center items-center relative">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full h-full flex">
            <div className="flex justify-around items-start w-full gap-2 sm:justify-start">
              {Object.keys(toDos).map((bucketId) => (
                <Bucket
                  bucketId={bucketId}
                  key={bucketId}
                  toDos={toDos[bucketId]}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
        {notToDos ? (
          <div className="w-full h-[80%] absolute flex justify-center items-center">
            <div className="w-full h-32 space-y-5">
              <p className="text-center font-bold text-3xl">
                새로운 보드를 추가해 보세요
              </p>
              <p className="text-center text-gray-600">
                보드를 사용하여 팀원들과 현재 대기중인, 진행중인,
                <br />
                완료된 보드의 작업 상태를 공유할 수 있습니다.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BoardList;
