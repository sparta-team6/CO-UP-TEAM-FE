import { useEffect } from "react";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGetFolders } from "../../../api/FolderQuery";
import ViewDoc from "../../../Components/ToolDocument/ViewDoc";
import Chat from "../../../layout/Chat";
import FolderList from "../../../layout/FolderList";
import MyProjectList from "../../../layout/MyProjectList";
import { HandleOpen, ProjectKey } from "../../../recoil/Atoms";

const DocList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetFolders(String(pjId));
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <div className="w-full h-[calc(100vh-3rem)] bg-white flex absolute bottom-0">
        <div
          className={`flex fixed top-0 left-0 mt-12 ml-0 h-full ${
            data?.data.length === 0 ? "sm:hidden" : "sm:w-full"
          }`}
        >
          <div className="sm:hidden">
            <MyProjectList />
          </div>
          <div className="hidden sm:block sm:w-full">
            <SlidingPanel type={"left"} isOpen={open} size={100}>
              <div onClick={onClick} className="flex">
                <MyProjectList />
              </div>
            </SlidingPanel>
            <FolderList />
          </div>
          <div className={`${data?.data.length === 0 ? "hidden" : "block sm:hidden"}`}>
            <FolderList />
          </div>
        </div>
        <div
          className={`${
            data?.data.length === 0
              ? "w-[calc(100%-506px)] h-full flex ml-[74px] p-4 md:w-full md:justify-center sm:p-2 sm:m-0"
              : " w-[calc(100%-794px)] h-full flex ml-[362px] p-4 md:w-[calc(100%-21rem)] md:justify-center sm:hidden sm:p-2 sm:m-0"
          }`}
        >
          <ViewDoc />
        </div>
      </div>
      <Chat />
    </>
  );
};

export default DocList;
