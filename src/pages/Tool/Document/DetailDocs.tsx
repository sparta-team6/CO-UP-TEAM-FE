import Chat from "../../../layout/Chat";
import DocumentList from "../../../layout/FolderList";
import MyProjectList from "../../../layout/MyProjectList";
import ViewDoc from "../../../Components/ToolDocument/ViewDoc";
import { useGetOneDoc } from "../../../api/DocumentQuery";
import { useParams } from "react-router-dom";

// 문서 조회 페이지
const DetailDocs = () => {
  const { postId } = useParams();
  const { data, isFetching } = useGetOneDoc(String(postId));
  const DocData = data?.data;
  return (
    <>
      <div className="w-full h-[calc(100vh-4rem)] sm:h-screen bg-[#ffffff] dark:bg-8 flex absolute bottom-0">
        <div className="flex fixed top-0 left-0 mt-16 h-full sm:hidden">
          <MyProjectList />
          <DocumentList />
        </div>
        <div className="w-[calc(100%-800px)] h-full flex ml-[368px] md:w-[calc(100%-21rem)] sm:w-full sm:p-2 sm:m-0">
          <ViewDoc {...DocData} isFetchingg={isFetching} />
        </div>
      </div>
      <Chat />
    </>
  );
};

export default DetailDocs;
