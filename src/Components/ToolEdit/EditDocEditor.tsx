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

import { Folders, useUpdateFolder } from "../../api/DocumentQuery";
import { queryClient } from "../../index";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type IForm = {
  title: string;
};

const DocEditor = ({ id, title, contents }: Folders) => {
  const { mutateAsync: UpdateFolder } = useUpdateFolder(id);
  const navigate = useNavigate();
  const editorRef = createRef<any>();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid: SubmitHandler<IForm> = (data) => {
    if (!data.title) {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!editorRef.current.getInstance().getMarkdown()) {
      alert("내용을 입력해주세요!");
      return;
    }

    UpdateFolder({
      id: id,
      title: data.title,
      contents: editorRef.current.getInstance().getMarkdown(),
    }).then(() => {
      queryClient.invalidateQueries("getFolders");
      navigate(-1);
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="hidden sm:flex justify-between items-center border-b-2 border-solid border-slate-400 pb-2">
          <span>문서</span>
          <div>
            <button
              className="border-none px-3 py-2 rounded-md text-white bg-slate-600"
              type="submit"
            >
              수정
            </button>
            <button
              type="button"
              className="border-none ml-2 px-3 py-2 rounded-md bg-slate-400"
              onClick={() => navigate(-1)}
            >
              닫기
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 mt-4">
          <input
            className="text-2xl font-bold border-none outline-none bg-transparent placeholder:text-black sm:text-3xl sm:w-full sm:text-center"
            {...register("title")}
            placeholder="제목을 적어보세요 :)"
            defaultValue={title}
          />
          <div className="sm:hidden">
            <button
              className="border-none p-[10px] rounded-md text-white bg-slate-600"
              type="submit"
            >
              수정
            </button>
            <button
              type="button"
              className="border-none ml-4 p-[10px] rounded-md bg-slate-400"
              onClick={() => navigate(-1)}
            >
              닫기
            </button>
          </div>
        </div>
      </form>
      <Editor
        height="80%"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        previewHighlight={false}
        ref={editorRef}
        initialValue={contents ? contents : ""}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </React.Fragment>
  );
};

export default React.memo(DocEditor);
