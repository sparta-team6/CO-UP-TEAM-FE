import React from "react";
import { useLocation } from "react-router-dom";
import { Folders } from "../../api/DocumentQuery";
import EditDocEditor from "../../Components/ToolEdit/EditDocEditor";
import Chat from "../../layout/Chat";
import DocumentList from "../../layout/DocumentList";
import MyProjectList from "../../layout/MyProjectList";

type ILocation = {
  state: Folders;
};

const EditDocs = () => {
  const location = useLocation() as ILocation;
  const result = location?.state;
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      <MyProjectList />
      <DocumentList />
      <div className="w-[calc(100%-41rem)] md:w-[calc(100%-21rem)]">
        <EditDocEditor {...result} />
      </div>
      <Chat />
    </div>
  );
};

export default React.memo(EditDocs);
