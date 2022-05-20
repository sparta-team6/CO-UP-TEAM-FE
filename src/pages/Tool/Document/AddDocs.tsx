import Chat from "../../../layout/Chat";
import DocEditor from "../../../Components/ToolAddDoc/DocEditor";
import MyProjectList from "../../../layout/MyProjectList";
import DocumentList from "../../../layout/FolderList";

const AddDocs = () => {
  return (
    <>
      <div className="w-full h-[calc(100vh-4rem)] bg-white flex absolute bottom-0">
        <div className="flex fixed top-0 left-0 mt-16 h-full">
          <div className="sm:hidden">
            <MyProjectList />
          </div>
          <div className="sm:hidden">
            <DocumentList />
          </div>
        </div>
        <div className="w-[calc(100%-800px)] h-full ml-[368px] flex flex-col md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
          <DocEditor />
        </div>
      </div>
      <Chat />
    </>
  );
};

export default AddDocs;
