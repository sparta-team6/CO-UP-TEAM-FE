import React from "react";
import { useLocation } from "react-router-dom";
import { Docs } from "../../../api/DocumentQuery";
import EditDocEditor from "../../../Components/ToolEdit/EditDocEditor";
import Chat from "../../../layout/Chat";
import DocumentList from "../../../layout/DocumentList";
import MyProjectList from "../../../layout/MyProjectList";

type ILocation = {
  state: Docs;
};

const EditDocs = () => {
  const location = useLocation() as ILocation;
  const result = location?.state;
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      <div className="sm:hidden">
        <MyProjectList />
      </div>
      <div className="sm:hidden">
        <DocumentList />
      </div>
      <div className="w-[calc(100%-41rem)] h-full flex flex-col p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
        <EditDocEditor {...result} />
      </div>
      <Chat />
    </div>
  );
};

export default React.memo(EditDocs);
