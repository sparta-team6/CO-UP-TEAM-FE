import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useAddFolder, useGetFolders, useUpdateFolder } from "../api/FolderQuery";
import { queryClient } from "..";
import FolderFixed from "../Components/ToolDocument/FolderFixed";
import imgFolder from "../images/img_folder.png";
import { FolderPlus } from "../elements/Icon/FolderPlus";
import { SvgFolder } from "../elements/Icon/SvgFolder";
import { Plus } from "../elements/Icon/Plus";
import { ProjectKey } from "../recoil/RoomID";

const FolderList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetFolders(pjId);
  const { mutateAsync: AddFol } = useAddFolder();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState(false);
  const [dfId, setDfId] = useState("");
  const [title, setTitle] = useState("");
  const { mutateAsync: UpdateFol } = useUpdateFolder(dfId);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const folder = {
      dfId,
      title: title,
    };
    UpdateFol(folder).then(() => {
      queryClient.invalidateQueries("getFolders");
      setEditTitle(false);
    });
  };

  const AddFolder = () => {
    const folder = {
      pjId,
      title: "새 폴더",
    };
    AddFol(folder).then(() => {
      queryClient.invalidateQueries("getFolders");
    });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {data?.data.length === 0 ? (
        <div className="w-72 h-full bg-[#F0F3F7] sm:w-full overflow-auto">
          <div className="flex justify-between items-center pt-5 px-4 sm:pt-4">
            <div className="font-bold text-2xl">문서목록</div>
            <div onClick={AddFolder} className="cursor-pointer">
              <Plus />
            </div>
          </div>
          <div className="border border-solid mx-3 my-2"></div>
          <div className="flex flex-col justify-center items-center pt-5">
            <img className="w-[165px] h-[165px] sm:w-[100px] sm:h-[100px]" src={imgFolder} alt="" />
            <span className="text-lg opacity-50 mt-[30px] sm:text-base sm:mt-5">
              새로운 문서를 추가해 보세요
            </span>
          </div>
        </div>
      ) : (
        <div className="w-72 h-full bg-[#F0F3F7] sm:w-full overflow-auto">
          <div className="flex justify-between items-center pt-5 px-4 sm:pt-4">
            <div className="font-bold text-2xl">문서목록</div>
            <div onClick={AddFolder} className="cursor-pointer">
              <Plus />
            </div>
          </div>
          <div className="border border-solid mx-3 my-2"></div>
          {data?.data?.map((folder) => {
            return (
              <div key={folder.dfId}>
                <div className="flex justify-between items-center pl-6 pr-5">
                  <div
                    className={`font-bold text-lg ${
                      editTitle && dfId === folder.dfId ? "hidden" : "block"
                    }`}
                  >
                    {folder?.docs?.length === 0 ? <SvgFolder /> : <FolderPlus />}
                    <span className="ml-4">{folder.title}</span>
                  </div>
                  <form
                    className={`w-full font-bold text-lg items-center justify-between ${
                      editTitle && dfId === folder.dfId ? "flex" : "hidden"
                    }`}
                    onSubmit={onSubmit}
                  >
                    <input defaultValue={folder.title} onChange={onChange} />
                  </form>
                  <FolderFixed dfId={folder.dfId} setEditTitle={setEditTitle} setDfId={setDfId} />
                </div>
                <div
                  className={`flex flex-col justify-center items-center pt-2 ${
                    folder?.docs?.length !== 0 && "hidden"
                  }`}
                >
                  <img
                    className="w-[165px] h-[165px] sm:w-[100px] sm:h-[100px]"
                    src={imgFolder}
                    alt=""
                  />
                  <span className="text-lg opacity-50 mt-[30px] sm:text-base sm:mt-5">
                    새로운 문서를 추가해 보세요
                  </span>
                </div>
                {folder.docs?.map((doc) => (
                  <div key={doc.docId} className="flex flex-col ml-[52px]">
                    <div className="flex items-center text-base m-1 cursor-pointer">
                      <div onClick={() => navigate(`/tool/${pjId}/document/${doc.docId}`)}>
                        {doc.title}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border border-solid mx-3 my-2"></div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default React.memo(FolderList);
