import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "../..";
import { useUpdateRoom } from "../../api/ProjectQuery";
import { resizeFile } from "../../servers/resize";

type IForm = {
  title: string;
  summary: string;
  img?: string;
  name: string;
  id?: number;
};

type IProps = {
  setUpOpen: Dispatch<SetStateAction<boolean>>;
  roomID?: string;
  roomImg: string;
  roomTitle: string;
  roomSummary: string;
};

const ProjectUpdateForm = ({ setUpOpen, roomID, roomImg, roomTitle, roomSummary }: IProps) => {
  const [imgBase64, setImgBase64] = useState<string>(roomImg);
  const fileInput = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUpdateRoom(String(roomID));
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (fileInput?.current?.files === null) return;
    const size = fileInput?.current?.files[0];
    if (size === undefined) {
      mutateAsync({
        title: data.title,
        summary: data.summary,
        thumbnail: roomImg,
        pjId: roomID,
      }).then(() => {
        queryClient.invalidateQueries("getProject");
        setUpOpen(false);
      });
    } else {
      const image = await resizeFile(size);
      mutateAsync({
        title: data.title,
        summary: data.summary,
        thumbnail: String(image),
        pjId: roomID,
      }).then(() => {
        queryClient.invalidateQueries("getProject");
        setUpOpen(false);
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
      <img
        width="100px"
        height="100px"
        alt=""
        src={
          imgBase64
            ? imgBase64
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6PA8mWFE7fwakdei0UJqZOhQWC0b0IKMDg&usqp=CAU"
        }
      />
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
      <form className="w-[70%] h-full flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={roomTitle} {...register("title")} />
        <textarea
          rows={4}
          className="outline-none resize-none"
          placeholder="소개"
          defaultValue={roomSummary}
          {...register("summary")}
        />
        <button className="w-[100px]" type="submit">
          수정하기
        </button>
      </form>
    </div>
  );
};

export default ProjectUpdateForm;
