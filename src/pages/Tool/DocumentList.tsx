import { useState } from "react";
import SlidingDocument from "../../Components/ToolDocument/SlidingDocument";
import ViewDoc from "../../Components/ToolDocument/ViewDoc";
import Chat from "../../layout/Chat";

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
      <SlidingDocument open={open} setOpen={setOpen} />
      <div className="w-[calc(100%-41rem)] h-full flex ml-[336px] p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
        <ViewDoc />
      </div>
      <Chat />
    </div>
  );
};

export default Document;
