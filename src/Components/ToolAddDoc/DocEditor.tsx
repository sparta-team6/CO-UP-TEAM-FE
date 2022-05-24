import React from "react";

import Prism from "prismjs";
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import "prismjs/themes/prism.css";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { createRef } from "react";

import { useAddDoc } from "../../api/DocumentQuery";
import { queryClient } from "../../index";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ChevronLeft } from "../../elements/Icon/ChevronLeft";
import { ProjectKey } from "../../recoil/RoomID";

interface IForm {
  title: string;
}

const DocEditor = () => {
  const { state } = useLocation();
  const { pjId } = useRecoilValue(ProjectKey);
  const navigate = useNavigate();
  const editorRef = createRef<Editor>();
  const { mutateAsync } = useAddDoc();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid: SubmitHandler<IForm> = (data) => {
    if (editorRef.current === null) return;
    if (!data.title) {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!editorRef.current.getInstance().getMarkdown()) {
      alert("내용을 입력해주세요!");
      return;
    }

    const doc = {
      dfId: state,
      title: data.title,
      contents: editorRef.current.getInstance().getMarkdown(),
      position: 1,
    };

    mutateAsync(doc).then(() => {
      queryClient.invalidateQueries("getFolders");
      navigate(`/tool/${pjId}/document/`);
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="hidden sm:flex justify-between items-center border-b border-solid border-[#BEBEBE] pb-2">
          <div
            className="flex justify-center items-center border-none w-[39px] h-[36px] rounded-md bg-5"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </div>
          <div>
            <button
              className="border-none w-[56px] h-[36px] rounded-md text-white bg-3"
              type="submit"
            >
              등록
            </button>
            <button
              type="button"
              className="border-none ml-2 w-[56px] h-[36px] rounded-md bg-5"
              onClick={() => navigate(-1)}
            >
              닫기
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mx-[46px] mt-[60px] mb-[20px] sm:mt-[30px] sm:mx-[10px]">
          <input
            className="text-[32px] font-bold border-none outline-none bg-transparent placeholder:text-gray-400 sm:w-full sm:text-left"
            {...register("title")}
            placeholder="제목을 적어보세요 :)"
            autoFocus
          />
          <div className="sm:hidden">
            <button
              className="border-none w-[62px] h-[44px] rounded-md text-white bg-3"
              type="submit"
            >
              등록
            </button>
            <button
              type="button"
              className="border-none ml-[16px] w-[62px] h-[44px] rounded-md bg-5"
              onClick={() => navigate(-1)}
            >
              닫기
            </button>
          </div>
        </div>
      </form>
      <Editor
        height="70%"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        previewHighlight={false}
        ref={editorRef}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        autofocus={false}
      />
    </React.Fragment>
  );
};

export default DocEditor;
