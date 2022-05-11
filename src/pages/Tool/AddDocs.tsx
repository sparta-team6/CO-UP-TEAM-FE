import MyProjectList from "../../layout/MyProjectList";
import DocumentList from "../../layout/DocumentList";
import Chat from "../../layout/Chat";
import DocEditor from "../../Components/ToolAddDoc/DocEditor";

const AddDocs = () => {
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      <MyProjectList />
      <DocumentList />
      <div className="w-[calc(100%-41rem)] md:w-[calc(100%-21rem)]">
        <DocEditor />
      </div>
      <Chat />
    </div>
  );
};

export default AddDocs;
