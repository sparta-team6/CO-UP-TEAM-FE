import React from "react";
import { useLocation } from "react-router-dom";
import { Docs } from "../../../api/DocumentQuery";
import EditDocEditor from "../../../Components/ToolEdit/EditDocEditor";
import Chat from "../../../layout/Chat";
import DocumentList from "../../../layout/FolderList";
import MyProjectList from "../../../layout/MyProjectList";

interface ILocation {
  state: Docs;
}

const EditDocs = () => {
  const location = useLocation() as ILocation;
  const result = location?.state;
  return (
    <>
      <div className="w-full h-[calc(100vh-3rem)] bg-white flex absolute bottom-0">
        <div className="flex fixed top-0 left-0 mt-12 h-full">
          <div className="sm:hidden">
            <MyProjectList />
          </div>
          <div className="sm:hidden">
            <DocumentList />
          </div>
        </div>
        <div className="w-[calc(100%-794px)] h-full ml-[362px] flex flex-col p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
          <EditDocEditor {...result} />
        </div>
      </div>
      <Chat />
    </>
  );
};

export default React.memo(EditDocs);
