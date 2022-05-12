import { useState } from "react";
import ViewDoc from "../../Components/ToolDocument/ViewDoc";
import Chat from "../../layout/Chat";
import DocumentList from "../../layout/DocumentList";
import MyProjectList from "../../layout/MyProjectList";

const Document = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    if (open) setOpen(false);
  };
  return (
    <div
      onClick={handleToggle}
      className="w-full  h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0"
    >
      <MyProjectList />
      <DocumentList />
      <ViewDoc />
      <Chat />
    </div>
  );
};

export default Document;
