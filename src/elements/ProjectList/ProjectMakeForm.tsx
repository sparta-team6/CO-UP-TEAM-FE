import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { usePostRoom } from "../../api/ProjectQuery";
import { MyProfile } from "../../recoil/Atoms";
import { resizeFile } from "../../servers/resize";

type IForm = {
  title: string;
  summary: string;
  thumbnail: string;
};

interface IProp {
  open: Dispatch<SetStateAction<boolean>>;
}

const ProjectMakeForm = ({ open }: IProp) => {
  const user = useRecoilValue(MyProfile);
  const [imgBase64, setImgBase64] = useState<string>("");
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
        thumbnail: user.profileImage,
      }).then((res) => {
        console.log(res);
        queryClient.invalidateQueries("getProject");
        open(false);
      });
    } else {
      const image = await resizeFile(size);
      mutateAsync({
        title: data.title,
        summary: data.summary,
        thumbnail: String(image),
      }).then((res) => {
        console.log(res);
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
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img width="100px" height="100px" alt="" src={imgBase64 ? imgBase64 : user.profileImage} />
      <label htmlFor="icon-button-file">
        <input
          type="file"
          id="icon-button-file"
          className="hidden"
          onChange={onChange}
          ref={fileInput}
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera fontSize="small" />
        </IconButton>
      </label>
      <form className="w-[70%] h-full flex flex-col space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="프로젝트제목" {...register("title")} />
        <textarea
          rows={4}
          className="outline-none resize-none"
          placeholder="프로젝트개요"
          {...register("summary")}
        />
        <button className="w-[100px]" type="submit">
          만들기
        </button>
      </form>
    </div>
  );
};

export default ProjectMakeForm;
