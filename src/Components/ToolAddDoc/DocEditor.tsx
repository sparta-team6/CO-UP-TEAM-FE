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
              type="submit"
            >
              등록
            </button>
            <button
              type="button"
              className="border-none ml-2 px-[15px] py-[8px] rounded-md bg-5"
              onClick={() => navigate(-1)}
            >
              닫기
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mx-[46px] mt-[60px] mb-[20px]">
          <input
            className="text-[32px] font-bold border-none outline-none bg-transparent placeholder:text-black sm:text-3xl sm:w-full sm:text-center"
            {...register("title")}
            placeholder="제목을 적어보세요 :)"
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
              className="border-none ml-[20px] w-[62px] h-[44px] rounded-md bg-5"
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
      />
    </React.Fragment>
  );
};

export default DocEditor;
