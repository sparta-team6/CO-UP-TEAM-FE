import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { queryClient } from "..";
import { Board, useGetBoard, usePostBoard } from "../api/BoardQuery";
import Bucket from "../Components/ToolBoard/Bucket";
import { ProjectKey } from "../recoil/Atoms";

const BoardList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board } = useGetBoard(String(pjId));
  const [test, setTest] = useState(board?.data);
  useEffect(() => {
    setTest(board?.data);
  }, [board]);
  console.log(test);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      console.log(destination, source);
      // same board movement.
      setTest((allBoards: any) => {
        const boardCopy = [...allBoards[Number(source.droppableId)].cards];
        const ThisKbbId = allBoards[Number(source.droppableId)].kbbId;
        const taskObj = boardCopy[source.index];
        console.log(taskObj);
        boardCopy.splice(Number(source.index), 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log(ThisKbbId);
        console.log(boardCopy);
        /* boardCopy로 변한 cards 배열을 어케하는지 */
        const test111 = {
          ...allBoards,
          [Number(source.droppableId)]: boardCopy,
        };
        return test111;
      });
    }
    /* 다른 버킷으로 이동 */
    if (destination.droppableId !== source.droppableId) {
      console.log(destination, source);
      // cross board movement
      setTest((allBoards: any) => {
        const sourceBoard = [...allBoards[Number(source.droppableId)].cards];
        const StartKbbId = allBoards[Number(source.droppableId)].kbbId;
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[Number(destination.droppableId)].cards];
        const LastKbbId = allBoards[Number(destination.droppableId)].kbbId;
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        console.log(StartKbbId, LastKbbId);
        console.log(sourceBoard, destinationBoard);
        const test112 = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
        return test112;
      });
    }
  };
  console.log(test);
  // 버킷 생성 테스트 공간
  const { mutateAsync } = usePostBoard();
  const onClick = () => {
    const bucket = {
      pjId: String(pjId),
      title: "done",
      position: 2,
    };
    mutateAsync(bucket)
      .then(() => {
        console.log(bucket);
        queryClient.invalidateQueries("getBoard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-full bg-red-200 overflow-auto">
      {/* <div onClick={onClick}>테스트 보내기</div> */}
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
