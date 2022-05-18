import React, { useEffect } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState } from "recoil";
import BoardList from "../../layout/BoardList";
import Chat from "../../layout/Chat";
import MyProjectList from "../../layout/MyProjectList";
import { HandleOpen } from "../../recoil/Atoms";

const ToolBoard = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <div className="w-full h-[calc(100vh-3rem)] bg-slate-100 flex absolute bottom-0">
        <div className="flex fixed top-0 left-0 mt-12 h-full">
          <div className="sm:hidden">
            <MyProjectList />
          </div>
          <div className="hidden sm:block sm:w-screen">
            <SlidingPanel type={"left"} isOpen={open} size={100}>
              <div onClick={onClick} className="flex">
                <MyProjectList />
              </div>
            </SlidingPanel>
            <BoardList />
          </div>
          <div className="w-[calc(100vw-29rem)] md:w-[calc(100vw-3rem)] sm:hidden">
            <BoardList />
          </div>
        </div>
      </div>
      <Chat />
    </>
  );
};

export default React.memo(ToolBoard);
