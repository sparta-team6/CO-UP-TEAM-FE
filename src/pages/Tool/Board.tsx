import BoardList from "../../layout/BoardList";
import Chat from "../../layout/Chat";
import MyProjectList from "../../layout/MyProjectList";

const Board = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      <MyProjectList />
      <BoardList />
      <Chat />
    </div>
  );
};

export default Board;
