import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../recoil/Atoms";
import { useAddFolder, useGetFolders, useUpdateFolder } from "../api/FolderQuery";
import { queryClient } from "..";
import FolderFixed from "../Components/ToolDocument/FolderFixed";

const FolderList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetFolders(pjId);
  const { mutateAsync: AddFol } = useAddFolder();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState(false);
  const [dfId, setDfId] = useState("");
  const [title, setTitle] = useState("");
  const { mutateAsync: UpdateFol } = useUpdateFolder(dfId);
  console.log(data?.data);

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
    <div className="w-72 h-full bg-[#F0F3F7] sm:w-full">
      <div className="flex justify-between items-center pt-5 px-4 sm:pt-4">
        <div className="font-bold text-2xl">문서목록</div>
        <nav className="w-8 font-bold text-2xl flex justify-center items-center">
          <button onClick={AddFolder}>+</button>
        </nav>
      </div>
      <div className="border border-solid mt-2 mb-3"></div>
      {data?.data?.map((folder) => {
        return (
          <div key={folder.dfId}>
            <div className="flex justify-between items-center px-4">
              <div
                className={`font-bold text-lg ${
                  editTitle && dfId === folder.dfId ? "hidden" : "block"
                }`}
              >
                {folder.title}
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
            <div className="flex flex-col ml-10 mt-2">
              <div className="flex items-center">
                <div className="text-base m-1 cursor-pointer">
                  {folder.docs?.map((doc) => (
                    <div
                      onClick={() => navigate(`/tool/${pjId}/document/${doc.docId}`)}
                      key={doc.docId}
                    >
                      {doc.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-solid mt-2 mb-3"></div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(FolderList);
