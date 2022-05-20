import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "../..";
import { usePostRoom } from "../../api/ProjectQuery";
import { resizeFile } from "../../servers/resize";
import { SvgEdit } from "../Icon/SvgEdit";
import DefaultImg from "../../images/logo_50x50.png";
import { IconButton } from "@mui/material";

interface IForm {
  title: string;
  summary: string;
  thumbnail: string;
}

interface IProp {
  open: Dispatch<SetStateAction<boolean>>;
}

const ProjectMakeForm = ({ open }: IProp) => {
  const [imgBase64, setImgBase64] = useState<string>(DefaultImg);
  const fileInput = useRef<HTMLInputElement>(null);
  const { mutateAsync } = usePostRoom();
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (fileInput.current?.files === null) return;
    const size = fileInput?.current?.files[0];
    if (size === undefined) {
      mutateAsync({
        title: data.title,
        summary: data.summary,
        thumbnail: imgBase64,
      }).then(() => {
        queryClient.invalidateQueries("getProject");
        open(false);
      });
    } else {
      const image = await resizeFile(size, 100, 100, "base64");
      mutateAsync({
        title: data.title,
        summary: data.summary,
        thumbnail: String(image),
      }).then(() => {
        queryClient.invalidateQueries("getProject");
        open(false);
      });
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    const files = e.target.files[0];
    if (files) {
      reader.readAsDataURL(files);
    }
  };
  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center">
      <img className="rounded-full mb-4" width="100px" height="100px" alt="" src={imgBase64} />
      <label htmlFor="icon-button-file">
        <input
          type="file"
          id="icon-button-file"
          className="hidden"
          onChange={onChange}
          ref={fileInput}
        />
        <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white border absolute top-[70px] right-[260px]">
          <IconButton aria-label="upload picture" component="span">
            <SvgEdit />
          </IconButton>
        </div>
      </label>

      <div className="w-[418px]">
        <form className="w-full h-full flex flex-col space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <span className="w-14 mr-4">팀 이름</span>
            <input
              className="w-[352px] h-10 p-2 rounded-md border-none border border-[#D1D1D1]"
              placeholder="팀 이름"
              {...register("title")}
            />
          </div>
          <div className="flex">
            <span className="w-14 mr-4 mt-2">소개</span>
            <textarea
              rows={5}
              className="w-[352px] h-[95px] outline-none resize-none p-2 rounded-md border-none border border-[#D1D1D1]"
              placeholder="소개"
              {...register("summary")}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="w-24 h-[45px] leading-[27px] px-[18px] py-[10px] text-white bg-3 rounded-md"
              type="submit"
            >
              방 만들기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectMakeForm;
