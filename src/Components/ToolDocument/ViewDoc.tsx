import { Link, useNavigate } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Folders, useDelFolder } from "../../api/DocumentQuery";
import "../../styles/ViewDoc.css";
import { queryClient } from "../..";

const ViewDoc = ({ title, contents, id }: Folders) => {
  const navigate = useNavigate();
  const { mutateAsync: DelFolder } = useDelFolder(Number(id));

  const onDelete = () => {
    DelFolder().then(() => {
      queryClient.invalidateQueries("getFolders");
      navigate("/tool/1/document");
    });
  };
  return (
    <div className="w-full h-full flex flex-col">
      {title && contents ? (
        <div className="p-4 mt-4">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-xl mt-5">
            <MarkdownPreview
              className="whitespace-pre-wrap break-all"
              source={contents}
            />
          </div>
          <Link
            to={`/tool/1/document/${id}/edit`}
            state={{
              id,
              title,
              contents,
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

      {/* <div className=" w-full h-full flex flex-col justify-center items-center">
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
        </div> */}
    </div>
  );
};

export default ViewDoc;
