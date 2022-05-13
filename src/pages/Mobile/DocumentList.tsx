import ViewDoc from "../../Components/ToolDocument/ViewDoc";
import { useGetFolders } from "../../api/DocumentQuery";
import DocumentList from "../../layout/DocumentList";

const MobileDocumentList = () => {
  const { data } = useGetFolders();

  return (
    <div className="w-full  h-[calc(100vh-3rem)] bg-slate-300 flex absolute bottom-0">
      {data?.data.length === 0 ? <ViewDoc /> : <DocumentList />}
    </div>
  );
};

export default MobileDocumentList;
