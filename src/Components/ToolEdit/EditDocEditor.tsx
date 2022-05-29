import React, { useState } from "react";

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

import { Docs, useUpdateDoc } from "../../api/DocumentQuery";
import { queryClient } from "../../index";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChevronLeft } from "../../elements/Icon/ChevronLeft";
import Swal from "sweetalert2";

interface IForm {
  title: string;
}

const DocEditor = ({ title, contents, docId }: Docs) => {
  const { id } = useParams();
  const { mutateAsync: UpdateDoc } = useUpdateDoc(String(docId));
  const navigate = useNavigate();
  const editorRef = createRef<Editor>();
  const { register, handleSubmit } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const onValid: SubmitHandler<IForm> = (data) => {
    if (editorRef.current === null) return;
    if (!data.title) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "제목을 입력해주세요😊",
      });
      return;
    }
    if (!editorRef.current.getInstance().getMarkdown()) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "내용을 입력해주세요😊",
      });
      return;
    }

    const doc = {
      docId,
      title: data.title,
      contents: editorRef.current.getInstance().getMarkdown(),
    };
    UpdateDoc(doc).then(() => {
      setLoading(false);
      queryClient.invalidateQueries("getFolders");
      navigate(`/tool/${id}/document/${docId}`);
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="hidden fixed top-0 left-0 w-full sm:flex justify-between items-center pb-2 px-[16px] pt-[19px]">
          <div className="flex justify-center items-center" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </div>
          <div className="flex items-center">
            <button
              className="border-none w-[56px] h-[36px] rounded-md text-white bg-3"
              type="submit"
            >
              {loading ? `수정중..` : `수정`}
            </button>
          </div>
        </div>
        <div className="flex h-[calc(100%-4rem)] items-center justify-between mx-[46px] pt-[60px] sm:pt-[115px] sm:mx-[10px]">
          <input
            className="w-3/5 text-[32px] font-bold border-none outline-none bg-transparent placeholder:text-gray-400 text-8 dark:text-[#ffffff] sm:w-full sm:text-left"
            {...register("title")}
            placeholder="제목을 적어보세요 :)"
            defaultValue={title}
            autoFocus
            maxLength={20}
          />
          <div className="sm:hidden">
            <button
              className="border-none w-[62px] h-[44px] rounded-md text-white bg-3"
              type="submit"
            >
              {loading ? `수정중..` : `수정`}
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
        initialValue={contents ? contents : ""}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        autofocus={false}
      />
    </React.Fragment>
  );
};

export default React.memo(DocEditor);
