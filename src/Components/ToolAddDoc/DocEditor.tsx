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

import { useAddDoc } from "../../api/DocumentQuery";
import { queryClient } from "../../index";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ChevronLeft } from "../../elements/Icon/ChevronLeft";
import { ProjectKey } from "../../recoil/RoomID";
import { dfId } from "../../recoil/AtomDocument";
import Swal from "sweetalert2";

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
  const getDfId = useRecoilValue(dfId);
  const [loading, setLoading] = useState(false);
  const onValid: SubmitHandler<IForm> = (data) => {
    if (editorRef.current === null) return;
    if (data.title.trim() === "") {
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
      dfId: state === null ? getDfId : state,
      title: data.title,
      contents: editorRef.current.getInstance().getMarkdown(),
    };
    setLoading(true);
    mutateAsync(doc).then(() => {
      setLoading(false);
      queryClient.invalidateQueries("getFolders");
      navigate(`/tool/${pjId}/document/`);
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
              {!loading ? `등록` : `등록중..`}
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
        <div className="flex h-[calc(100%-4rem)] items-center justify-between mx-[46px] pt-[60px] sm:pt-[115px] sm:mx-[10px]">
          <input
            className="text-[32px] w-3/5 font-bold border-none outline-none bg-transparent placeholder:text-gray-400 text-8 dark:text-[#ffffff] sm:w-full sm:text-left"
            {...register("title")}
            placeholder="제목을 적어보세요 :)"
            autoFocus
            maxLength={20}
          />
          <div className="sm:hidden">
            <button
              className="border-none w-[62px] h-[44px] rounded-md text-white bg-3"
              type="submit"
            >
              {!loading ? `등록` : `등록중..`}
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
