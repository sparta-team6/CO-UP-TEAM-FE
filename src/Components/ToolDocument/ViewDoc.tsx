import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Docs, useDelDoc, useGetNewDoc } from "../../api/DocumentQuery";
import "../../styles/ViewDoc.css";
import { queryClient } from "../..";
import { useAddFolder } from "../../api/FolderQuery";
import EmptyFolder from "../../images/Document/EmptyFolder.png";
import EmptyFolderM from "../../images/Document/EmptyFolder_m.png";
import { ChevronLeft } from "../../elements/Icon/ChevronLeft";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { NewDoc } from "../../recoil/AtomDocument";

const ViewDoc = ({ title, contents, isFetchingg, docId, modifiedTime, nickname }: Docs) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: DelDoc } = useDelDoc(String(docId));
  const { mutateAsync: AddFol } = useAddFolder();
  const docData = useRecoilValue(NewDoc);
  const { isFetching } = useGetNewDoc(String(id));
  const { mutateAsync: DelDoc2 } = useDelDoc(String(docData?.docId));

  const onDelete = () => {
    Swal.fire({
      title: "삭제",
      text: "진짜 삭제하시겠어요?!!",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.value) {
        DelDoc().then(() => {
          queryClient.invalidateQueries("getFolders");
          queryClient.invalidateQueries("getNewDoc");
          navigate(`/tool/${id}/document`);
        });
      }
    });
  };

  const onDelete2 = () => {
    Swal.fire({
      title: "삭제",
      text: "진짜 삭제하시겠어요?!!",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.value) {
        DelDoc2().then(() => {
          queryClient.invalidateQueries("getFolders");
          queryClient.invalidateQueries("getNewDoc");
          navigate(`/tool/${id}/document`);
        });
      }
    });
  };

  const AddFolder = () => {
    const folder = {
      pjId: String(id),
      title: "새 폴더",
    };
    AddFol(folder).then(() => {
      queryClient.invalidateQueries("getFolders");
    });
  };
  return (
    <>
      {!isFetchingg && (
        <div className="w-full h-full flex flex-col overflow-y-auto">
          {title && contents ? (
            <>
              <div className="hidden fixed top-0 left-0 w-full sm:flex justify-between items-center pb-2 px-[16px] pt-[19px]">
                <div
                  className="flex justify-center items-center border-none"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft />
                </div>
                <div className="flex items-center">
                  <button
                    className="border-none w-[56px] h-[36px] rounded-md text-white hover:bg-h1 bg-3"
                    onClick={() =>
                      navigate(`/tool/${id}/document/${docId}/edit`, {
                        state: { docId, title, contents },
                      })
                    }
                  >
                    수정
                  </button>
                  <button
                    className="border-none ml-2 w-[56px] h-[36px] rounded-md hover:bg-h2 bg-5"
                    onClick={onDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:hidden mx-[46px] mt-[39px] mb-[20px]">
                <div className="flex justify-between items-center">
                  <div className="text-[32px] font-bold sm:mt-[100px] sm:mb-[22px] sm:mx-[12px]">
                    <span>{title}</span>
                  </div>
                  <div>
                    <button
                      className="border-none w-[62px] h-[44px] rounded-md text-white hover:bg-h1 bg-3"
                      onClick={() =>
                        navigate(`/tool/${id}/document/${docId}/edit`, {
                          state: { docId, title, contents },
                        })
                      }
                    >
                      수정
                    </button>
                    <button
                      className="border-none ml-[16px] w-[62px] h-[44px] rounded-md hover:bg-h2 bg-5"
                      onClick={onDelete}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="text-lg text-[#999] mt-[15px]">
                  <span>{modifiedTime?.replaceAll("-", ".").replace("T", "  ").slice(0, 17)}</span>
                  <span className="ml-[12px]">{`by ${nickname}`}</span>
                </div>
              </div>
              <div className="hidden sm:block text-[32px] font-bold sm:mt-[100px] sm:mb-[22px] sm:mx-[12px]">
                <span>{title}</span>
              </div>
              <div className="mx-[46px] mt-[20px] sm:mx-[12px] sm:mt-0">
                <MarkdownPreview
                  className="whitespace-pre-wrap break-all text-8 dark:text-[#ffffff]"
                  source={contents}
                />
              </div>
            </>
          ) : docData ? (
            <>
              {!isFetching && (
                <>
                  <div className="flex flex-col sm:hidden mx-[46px] mt-[37px] mb-[20px]">
                    <div className="flex justify-between items-center h-[47px]">
                      <div className="text-[32px] font-bold">
                        <span>{docData.title}</span>
                      </div>
                      <div>
                        <button
                          className="border-none w-[62px] h-[44px] rounded-md text-white hover:bg-h1 bg-3"
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
                          className="border-none ml-[16px] w-[62px] h-[44px] rounded-md hover:bg-h2 bg-5"
                          onClick={onDelete2}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                    <div className="text-lg text-[#999] mt-[15px]">
                      <span>
                        {docData?.modifiedTime
                          ?.replaceAll("-", ".")
                          .replace("T", "  ")
                          .slice(0, 17)}
                      </span>
                      <span className="ml-[12px]">{`by ${docData?.nickname}`}</span>
                    </div>
                  </div>
                  <div className="mx-[46px] mt-[20px] sm:mx-[12px] sm:mt-0">
                    <MarkdownPreview
                      className="whitespace-pre-wrap break-all text-8 dark:text-[#ffffff]"
                      source={docData.contents}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <div className=" w-full h-full flex flex-col justify-center items-center text-center px-[46px]">
              <img width={328} height={286} className="block sm:hidden" src={EmptyFolder} alt="" />
              <img width={178} height={154} className="hidden sm:block" src={EmptyFolderM} alt="" />
              <div className="font-bold text-3xl pt-[44px] pb-[22px]">
                <span>새로운 문서를 추가해 보세요</span>
              </div>
              <div className="w-full flex flex-col space-y-2 text-[#666]">
                <span>미팅 노트, 제품 요구사항, 결정 사항 또는 기타 콘텐츠를 만들어</span>
                <span>팀원들과 공유해보세요</span>
              </div>
              <button
                onClick={() => {
                  AddFolder();
                  navigate(`/tool/${id}/document/add`);
                }}
                className="border-none text-xl w-[192px] h-[52px] mt-[46px] rounded-[4px] text-white bg-3 font-bold"
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
