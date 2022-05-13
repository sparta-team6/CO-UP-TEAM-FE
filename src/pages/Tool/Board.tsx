import { useEffect } from "react";
import SlidingPanel from "react-sliding-side-panel";
import { useRecoilState } from "recoil";
import BoardList from "../../layout/BoardList";
import Chat from "../../layout/Chat";
import MyProjectList from "../../layout/MyProjectList";
import { HandleOpen } from "../../recoil/Atoms";

const Board = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);

  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <div className="w-full h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
        <div className="flex sticky h-full">
          <div className="sm:hidden">
            <MyProjectList />
          </div>
          <div className="hidden sm:block sm:w-screen">
            <SlidingPanel type={"left"} isOpen={open} size={100}>
              <MyProjectList />
            </SlidingPanel>
            <BoardList />
          </div>
          <div className="w-[calc(100vw-23rem)] md:w-[calc(100vw-3rem)] sm:hidden">
            <BoardList />
          </div>
        </div>
      </div>
      <Chat />
    </>
  );
};

export default Board;
