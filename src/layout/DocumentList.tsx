import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../recoil/Atoms";
import { useAddFolder, useGetFolders, useUpdateFolder } from "../api/FolderQuery";
import { queryClient } from "..";
import FolderFixed from "../Components/ToolDocument/FolderFixed";
import { SubmitHandler, useForm } from "react-hook-form";

type IForm = {
  title: string;
};

const DocumentList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetFolders(pjId);
  const { mutateAsync: AddFol } = useAddFolder();
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState(false);
  const [dfId, setDfId] = useState("");
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const { mutateAsync: UpdateFol } = useUpdateFolder(dfId);

  const onSubmit: SubmitHandler<IForm> = (value) => {
    const folder = {
      dfId,
      title: value.title,
      position: 1,
    };
    UpdateFol(folder).then(() => {
      queryClient.invalidateQueries("getFolders");
      setEditTitle(false);
      setValue("title", "");
    });
  };

  const AddFolder = () => {
    const folder = {
      pjId,
      title: "폴더 1",
      position: 1,
    };
    AddFol(folder).then(() => {
      queryClient.invalidateQueries("getFolders");
    });
  };

  return (
    <div className="w-72 h-full bg-orange-300 sm:w-full">
      <div className="flex justify-between items-center pt-5 px-4 sm:pt-4">
        <div className="font-bold text-xl">문서목록</div>
        <nav className="w-8 font-bold text-2xl flex justify-center items-center">
          <div onClick={AddFolder}>+</div>
        </nav>
      </div>
      <hr />
      {data?.data?.map((folder) => {
        return (
          <div key={folder.dfId}>
            <div className={`flex justify-between items-center px-4`}>
              <div
                className={`font-bold text-lg ${
                  editTitle && dfId === folder.dfId ? "hidden" : "block"
                }`}
              >
                {folder.title}
              </div>
              <div className={`${editTitle && dfId === folder.dfId ? "hidden" : "block"}`}>
                <FolderFixed dfId={folder.dfId} setEditTitle={setEditTitle} setDfId={setDfId} />
              </div>
              <form
                className={`w-full font-bold text-lg items-center justify-between ${
                  editTitle && dfId === folder.dfId ? "flex" : "hidden"
                }`}
                onSubmit={handleSubmit(onSubmit)}
              >
                <label>
                  <input defaultValue={folder.title} {...register("title")} />
                </label>
                <FolderFixed dfId={folder.dfId} setEditTitle={setEditTitle} setDfId={setDfId} />
              </form>
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
          </div>
        );
      })}
      <hr />
    </div>
  );
};

export default React.memo(DocumentList);
