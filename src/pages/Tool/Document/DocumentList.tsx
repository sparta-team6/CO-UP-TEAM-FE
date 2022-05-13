import { useGetFolders } from "../../../api/DocumentQuery";
import ViewDoc from "../../../Components/ToolDocument/ViewDoc";
import Chat from "../../../layout/Chat";
import DocumentList from "../../../layout/DocumentList";
import MyProjectList from "../../../layout/MyProjectList";

const Document = () => {
  const { data } = useGetFolders();
  console.log(data?.data.length);
  return (
    <>
      {data?.data.length === 0 ? (
        <div className="w-full  h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
          <div className="flex fixed top-0 left-0 mt-12 h-full sm:hidden">
            <MyProjectList />
            <DocumentList />
          </div>
          <div className="w-full h-full flex ml-[336px] p-4 md:justify-center sm:p-2 sm:m-0">
            <ViewDoc />
          </div>
        </div>
      ) : (
        <div className="w-full  h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
          <div className="flex fixed top-0 left-0 mt-12 h-full sm:w-full">
            <MyProjectList />
            <DocumentList />
          </div>
          <div className="w-[calc(100%-41rem)] h-full flex ml-[336px] p-4 md:w-[calc(100%-21rem)] md:justify-center sm:hidden sm:p-2 sm:m-0">
            <ViewDoc />
          </div>
        </div>
      )}
      <Chat />
    </>
  );
};

export default Document;
