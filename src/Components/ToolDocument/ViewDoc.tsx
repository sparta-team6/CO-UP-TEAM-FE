import { Link, useLocation, useNavigate } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Folders, useDelFolder } from "../../api/DocumentQuery";
import "../../styles/ViewDoc.css";
import { queryClient } from "../..";

interface RouteState {
  state: Folders;
}

const ViewDoc = () => {
  const navigate = useNavigate();
  const location = useLocation() as RouteState;
  const result = location?.state;
  const { mutateAsync: DelFolder } = useDelFolder(Number(result?.id));

  const onDelete = () => {
    DelFolder().then(() => {
      queryClient.invalidateQueries("getFolders");
      navigate("/tool/1/document");
    });
  };
  return (
    <div className="w-[calc(100%-41rem)] h-full flex flex-col md:w-[calc(100%-21rem)] sm:w-full">
      {result ? (
        <div className="p-4 mt-4">
          <div className="text-2xl font-bold">{result.title}</div>
          <div className="text-xl mt-5">
            <MarkdownPreview
              className="whitespace-pre-wrap break-all"
              source={result.contents}
            />
          </div>
          <Link
            to={`/tool/1/document/${result.id}/edit`}
            state={{
              id: result.id,
              title: result.title,
              contents: result.contents,
            }}
          >
            수정
          </Link>
          <button onClick={onDelete}>삭제</button>
        </div>
      ) : (
        <div className=" w-full h-full flex flex-col justify-center items-center">
          <div className="font-bold text-2xl m-4">
            새로운 문서를 추가해 보세요
          </div>
          <div>
            미팅 노트, 제품 요구사항, 결정 사항 또는 기타 콘텐츠를 만들어
          </div>
          <div>팀원들과 공유해보세요</div>
          <button className="border-none m-4 px-4 py-3 rounded-3xl bg-slate-400 font-bold">
            <Link to="/tool/1/document/add">첫 페이지 만들기</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewDoc;
