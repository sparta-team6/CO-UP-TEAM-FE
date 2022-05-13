import Chat from "../../../layout/Chat";
import DocumentList from "../../../layout/DocumentList";
import MyProjectList from "../../../layout/MyProjectList";
import ViewDoc from "../../../Components/ToolDocument/ViewDoc";
import { useGetOneFolder } from "../../../api/DocumentQuery";
import { useParams } from "react-router-dom";

const DocumentDetail = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetOneFolder(Number(postId));
  const folderData = data?.data;

  return (
    <div className="w-full  h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      <div className="flex fixed top-0 left-0 mt-12 h-full sm:hidden">
        <MyProjectList />
        <DocumentList />
      </div>
      <div className="w-[calc(100%-41rem)] h-full flex ml-[336px] p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
        <ViewDoc {...folderData} isLoading={isLoading} />
      </div>
      <Chat />
    </div>
  );
};

export default DocumentDetail;
