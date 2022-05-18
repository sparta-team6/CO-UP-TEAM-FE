import Chat from "../../../layout/Chat";
import DocumentList from "../../../layout/FolderList";
import MyProjectList from "../../../layout/MyProjectList";
import ViewDoc from "../../../Components/ToolDocument/ViewDoc";
import { useGetOneDoc } from "../../../api/DocumentQuery";
import { useParams } from "react-router-dom";

const DetailDocs = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetOneDoc(String(postId));
  const DocData = data?.data;
  return (
    <>
      <div className="w-full  h-[calc(100vh-3rem)] bg-white flex absolute bottom-0">
        <div className="flex fixed top-0 left-0 mt-12 h-full sm:hidden">
          <MyProjectList />
          <DocumentList />
        </div>
        <div className="w-[calc(100%-794px)] h-full flex ml-[362px] p-4 md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
          <ViewDoc {...DocData} isLoading={isLoading} />
        </div>
      </div>
      <Chat />
    </>
  );
};

export default DetailDocs;
