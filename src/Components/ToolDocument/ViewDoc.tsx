import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Docs, useDelDoc } from "../../api/DocumentQuery";
import "../../styles/ViewDoc.css";
import { queryClient } from "../..";
import { useAddFolder } from "../../api/FolderQuery";

const ViewDoc = ({ title, contents, isLoading, docId }: Docs) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: DelDoc } = useDelDoc(String(docId));
  const { mutateAsync: AddFol } = useAddFolder();

  const onDelete = () => {
    DelDoc().then(() => {
      queryClient.invalidateQueries("getFolders");
      navigate(`/tool/${id}/document`);
    });
  };

  const AddFolder = () => {
    const folder = {
      pjId: String(id),
      title: "새 폴더",
      position: 1,
    };
    AddFol(folder).then(() => {
      queryClient.invalidateQueries("getFolders");
    });
  };
  return (
    <>
      {!isLoading && (
        <div className="w-full h-full flex flex-col">
          {title && contents ? (
            <div className="p-4 mt-4">
              <div className="text-2xl font-bold">{title}</div>
              <div className="text-xl mt-5">
                <MarkdownPreview className="whitespace-pre-wrap break-all" source={contents} />
              </div>
              <button
                onClick={() =>
                  navigate(`/tool/${id}/document/${docId}/edit`, {
                    state: { docId, title, contents },
                  })
                }
              >
                수정
              </button>
              <button onClick={onDelete}>삭제</button>
            </div>
          ) : (
            <div className=" w-full h-full flex flex-col justify-center items-center">
              <div className="font-bold text-2xl m-4">
                새로운 폴더를 만들어 문서를 추가해 보세요
              </div>
              <div>미팅 노트, 제품 요구사항, 결정 사항 또는 기타 콘텐츠를 만들어</div>
              <div>팀원들과 공유해보세요</div>
              <button
                onClick={AddFolder}
                className="border-none m-4 px-4 py-3 rounded-3xl bg-slate-400 font-bold"
              >
                새 폴더 만들기
                {/* <Link to={`/tool/${id}/document/add`}>첫 페이지 만들기</Link> */}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewDoc;
