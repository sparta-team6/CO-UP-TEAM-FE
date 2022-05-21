import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Docs, useDelDoc } from "../../api/DocumentQuery";
import "../../styles/ViewDoc.css";
import { queryClient } from "../..";
import { useAddFolder, useGetFolders } from "../../api/FolderQuery";
import imgFolder2 from "../../images/img_folder2.png";
import { ChevronLeft } from "../../elements/Icon/ChevronLeft";

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
            <>
              <div className="hidden sm:flex justify-between items-center border-b-2 border-solid border-slate-400 pb-2">
                <div
                  className="border-none px-[15px] py-[8px] rounded-md bg-5"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft />
                </div>
                <div>
                  <button
                    className="border-none px-[15px] py-[8px] rounded-md text-white bg-3"
                    onClick={() =>
                      navigate(`/tool/${id}/document/${docId}/edit`, {
                        state: { docId, title, contents },
                      })
                    }
                  >
                    수정
                  </button>
                  <button
                    className="border-none ml-2 px-[15px] py-[8px] rounded-md bg-5"
                    onClick={onDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:hidden mx-[46px] mt-[60px] mb-[20px]">
                <div className="flex justify-between items-center h-[47px] pl-[2px]">
                  <div className="text-[32px] font-bold">{title}</div>
                  <div>
                    <button
                      className="border-none w-[62px] h-[44px] rounded-md text-white bg-3"
                      onClick={() =>
                        navigate(`/tool/${id}/document/${docId}/edit`, {
                          state: { docId, title, contents },
                        })
                      }
                    >
                      수정
                    </button>
                    <button
                      className="border-none ml-[16px] w-[62px] h-[44px] rounded-md bg-5"
                      onClick={onDelete}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="text-lg text-[#999] mt-[15px]">{"2022.05.04  by 작성자"}</div>
              </div>
              <div className="hidden sm:block text-[32px] font-bold">{title}</div>
              <div className="text-xl mx-[46px] mt-[20px]">
                <MarkdownPreview
                  className="whitespace-pre-wrap break-all text-lg"
                  source={contents}
                />
              </div>
            </>
          ) : docData ? (
            <>
              <div className="flex flex-col sm:hidden mx-[46px] mt-[60px] mb-[20px]">
                <div className="flex justify-between items-center h-[47px] pl-[2px]">
                  <div className="text-[32px] font-bold">{docData.title}</div>
                  <div>
                    <button
                      className="border-none w-[62px] h-[44px] rounded-md text-white bg-3"
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
                      className="border-none ml-[16px] w-[62px] h-[44px] rounded-md bg-5"
                      onClick={onDelete2}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="text-lg text-[#999] mt-[15px]">{"2022.05.04  by 작성자"}</div>
              </div>
              <div className="text-xl mx-[46px] mt-[20px]">
                <MarkdownPreview
                  className="whitespace-pre-wrap break-all text-lg"
                  source={docData.contents}
                />
              </div>
            </>
          ) : (
            <div className=" w-full h-full flex flex-col justify-center items-center text-center px-[46px]">
              <img
                className="w-[328px] h-[286px] sm:w-[177px] sm:h-[154px]"
                src={imgFolder2}
                alt=""
              />
              <div className="font-bold text-3xl pt-[33px] pb-[20px]">
                <span>새로운 문서를 추가해 보세요</span>
              </div>
              <div className="w-full flex flex-col space-y-1 text-gray-500">
                <span>미팅 노트, 제품 요구사항, 결정 사항 또는 기타 콘텐츠를 만들어</span>
                <span>팀원들과 공유해보세요</span>
              </div>
              <button
                onClick={AddFolder}
                className="border-none w-[192px] h-[52px] mt-[36px] rounded-lg text-white bg-3 font-bold"
              >
                첫 페이지 만들기
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewDoc;
