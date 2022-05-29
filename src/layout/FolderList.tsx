import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useAddFolder, useGetFolders, useUpdateFolder } from "../api/FolderQuery";
import { queryClient } from "..";
import FolderFixed from "../Components/ToolDocument/FolderFixed";
import EmptyFile from "../images/Document/EmptyFile.png";
import { FolderPlus } from "../elements/Icon/FolderPlus";
import { SvgFolder } from "../elements/Icon/SvgFolder";
import { Plus } from "../elements/Icon/Plus";
import { ProjectKey } from "../recoil/RoomID";
import styled from "styled-components";

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
        <Scroll className="w-72 h-full bg-[#F0F3F7] dark:bg-7 sm:w-full overflow-auto">
          <div className="flex justify-between items-center px-[20px] pt-[45px]">
            <span className="font-bold text-2xl">문서목록</span>
            <div onClick={AddFolder} className="cursor-pointer">
              <Plus />
            </div>
          </div>
          <div className="border border-solid w-[264px] mx-auto mt-[10px] sm:w-[90%]"></div>
          <div className="flex flex-col justify-center items-center mt-[50px] sm:hidden">
            <img width={131} height={130} src={EmptyFile} alt="" />
            <span className="text-lg opacity-50 mt-[30px] sm:text-base sm:mt-5">
              새로운 문서를 추가해 보세요
            </span>
          </div>
        </Scroll>
      ) : (
        <Scroll className="w-72 h-full bg-[#F0F3F7] dark:bg-7 sm:w-full overflow-auto">
          <div className="flex justify-between items-center pt-[45px] px-[20px]">
            <span className="font-bold text-2xl">문서목록</span>
            <div onClick={AddFolder} className="cursor-pointer">
              <Plus />
            </div>
          </div>
          <div className="border-[#D7DCE5] dark:border-[#666666] border-[1px] border-solid w-[264px] mx-auto mt-[10px] sm:w-[90%]"></div>
          {data?.data?.map((folder) => {
            return (
              <div key={folder.dfId}>
                <div className="flex justify-between items-center pl-6 pr-5 mt-[16px]">
                  <div
                    className={`font-bold text-lg ${
                      editTitle && dfId === folder.dfId ? "hidden" : "block"
                    }`}
                  >
                    {folder?.docs?.length === 0 ? <SvgFolder /> : <FolderPlus />}
                    <span className="ml-[15px]">{folder.title}</span>
                  </div>
                  <form
                    className={`w-full font-bold text-lg items-center justify-between ${
                      editTitle && dfId === folder.dfId ? "flex" : "hidden"
                    }`}
                    onSubmit={onSubmit}
                  >
                    <input
                      maxLength={11}
                      autoFocus
                      className="border-none dark:bg-white dark:text-black dark:caret-8"
                      defaultValue={folder.title}
                      onChange={onChange}
                    />
                  </form>
                  <FolderFixed dfId={folder.dfId} setEditTitle={setEditTitle} setDfId={setDfId} />
                </div>
                <div
                  className={`flex flex-col justify-center items-center pt-2 sm:hidden ${
                    folder?.docs?.length !== 0 && "hidden"
                  }`}
                >
                  <img width={131} height={130} src={EmptyFile} alt="" />
                  <span className="text-lg opacity-50 mt-[30px] sm:text-base sm:mt-5">
                    새로운 문서를 추가해 보세요
                  </span>
                </div>
                {folder.docs?.map((doc) => (
                  <div key={doc.docId} className="flex flex-col ml-[54px] mr-[41px] my-[5px]">
                    <div className="flex items-center text-base cursor-pointer">
                      <span
                        className="text-ellipsis overflow-hidden whitespace-nowrap"
                        onClick={() => navigate(`/tool/${pjId}/document/${doc.docId}`)}
                      >
                        {doc.title}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-[#D7DCE5] dark:border-[#666666] border-[1px] border-solid w-[264px] mx-auto mt-[10px] sm:w-[90%]"></div>
              </div>
            );
          })}
        </Scroll>
      )}
    </>
  );
};

export default React.memo(FolderList);

const Scroll = styled.div`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;
