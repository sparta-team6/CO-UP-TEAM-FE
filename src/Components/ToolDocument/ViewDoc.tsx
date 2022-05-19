import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Docs, useDelDoc } from "../../api/DocumentQuery";
import "../../styles/ViewDoc.css";
import { queryClient } from "../..";
import { useAddFolder, useGetFolders } from "../../api/FolderQuery";
import imgFolder2 from "../../images/img_folder2.png";

const ViewDoc = ({ title, contents, isLoading, docId }: Docs) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: DelDoc } = useDelDoc(String(docId));
  const { mutateAsync: AddFol } = useAddFolder();
  const { data } = useGetFolders(String(id));
  const folderData = data?.data[data?.data.length - 1];
  const docData = folderData?.docs?.[folderData?.docs.length - 1];
  const { mutateAsync: DelDoc2 } = useDelDoc(String(docData?.docId));

  const onDelete = () => {
    DelDoc().then(() => {
      queryClient.invalidateQueries("getFolders");
      navigate(`/tool/${id}/document`);
    });
  };
  const onDelete2 = () => {
    DelDoc2().then(() => {
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
              <div className="flex justify-between">
                <div className="text-2xl font-bold">{title}</div>
                <div>
                  <button
                    className="border-none px-[15px] py-[10px] rounded-md text-white bg-3"
                    onClick={() =>
                      navigate(`/tool/${id}/document/${docId}/edit`, {
                        state: { docId, title, contents },
                      })
                    }
                  >
                    수정
                  </button>
                  <button
                    className="border-none ml-4 px-[15px] py-[10px] rounded-md bg-[#E7EBF2]"
                    onClick={onDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="text-xl p-4 mt-5">
                <MarkdownPreview className="whitespace-pre-wrap break-all" source={contents} />
              </div>
            </div>
          ) : docData ? (
            <div className="p-4 mt-4">
              <div className="flex justify-between">
                <div className="text-2xl font-bold">{docData.title}</div>
                <div>
                  <button
                    className="border-none px-[15px] py-[10px] rounded-md text-white bg-3"
                    onClick={() =>
                      navigate(`/tool/${id}/document/${docData.docId}/edit`, {
                        state: {
                          docId: docData.docId,
                          title: docData.title,
                          contents: docData.contents,
                        },
                      })
                    }
                  >
                    수정
                  </button>
                  <button
                    className="border-none ml-4 px-[15px] py-[10px] rounded-md bg-[#E7EBF2]"
                    onClick={onDelete2}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="text-xl p-4 mt-5">
                <MarkdownPreview
                  className="whitespace-pre-wrap break-all"
                  source={docData.contents}
                />
              </div>
            </div>
          ) : (
            <div className=" w-full h-full flex flex-col justify-center items-center">
              <img width={328} height={286} src={imgFolder2} alt="" />
              <div className="font-bold text-2xl m-4">
                새로운 폴더를 만들어 문서를 추가해 보세요
              </div>
              <div>미팅 노트, 제품 요구사항, 결정 사항 또는 기타 콘텐츠를 만들어</div>
              <div>팀원들과 공유해보세요</div>
              <button
                onClick={AddFolder}
                className="border-none m-4 px-8 py-3 rounded-md text-white bg-3 font-bold"
              >
                새 폴더 만들기
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewDoc;
