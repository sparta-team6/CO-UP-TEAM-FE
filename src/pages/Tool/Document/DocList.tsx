import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGetFolders } from "../../../api/FolderQuery";
import ViewDoc from "../../../Components/ToolDocument/ViewDoc";
import Chat from "../../../layout/Chat";
import FolderList from "../../../layout/FolderList";
import MyProjectList from "../../../layout/MyProjectList";
import { docId } from "../../../recoil/AtomDocument";
import { HandleOpen } from "../../../recoil/AtomsInterface";
import { ProjectKey } from "../../../recoil/RoomID";

const DocList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetFolders(String(pjId));
  const [open, setOpen] = useRecoilState(HandleOpen);
  const getDocId = useRecoilValue(docId);
  const navigate = useNavigate();
  const onClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
    if (!docId) {
      navigate(`/tool/${pjId}/document/${getDocId}`);
    }
  }, []);
  return (
    <>
      <div className="w-full h-[calc(100vh-4rem)] bg-white flex absolute bottom-0">
        <div
          className={`flex fixed h-full sm:h-[calc(100%-144px)] top-0 left-0 mt-16 ml-0 z-[60] ${
            data?.data.length === 0 ? "sm:hidden" : "sm:w-full"
          }`}
        >
          <div className="sm:hidden">
            <MyProjectList />
          </div>
          <div className="hidden sm:flex sm:w-full">
            <SlidingPanel type={"left"} isOpen={open} size={100}>
              <div onClick={onClick} className="flex">
                <MyProjectList />
              </div>
            </SlidingPanel>
            <FolderList />
          </div>
          <div className="sm:hidden">
            <FolderList />
          </div>
        </div>
        <div
          className={`w-[calc(100%-800px)] h-full flex ml-[368px] md:w-full md:justify-center sm:p-2 sm:m-0 ${
            data?.data.length !== 0 && "sm:hidden"
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
