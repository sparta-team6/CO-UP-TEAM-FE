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
  const [imgFile, setImgFile] = useState();
  const fileInput = useRef<any>();
  const { mutateAsync } = usePostRoom();
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const size = fileInput.current.files[0];
    if (size === undefined) {
      mutateAsync({
        title: data.title,
        summary: data.summary,
        thumbnail: user.profile_image,
      }).then(() => {
        queryClient.invalidateQueries("getProject");
        open(false);
      });
    } else {
      const image = await resizeFile(size);
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
  const onChange = (e: any) => {
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
      setImgFile(files);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img width="100px" height="100px" alt="" src={imgBase64 ? imgBase64 : user.profile_image} />
      <label htmlFor="icon-button-file">
        <input
          type="file"
          id="icon-button-file"
          className="hidden"
          onChange={onChange}
          ref={fileInput}
          name={imgFile}
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
