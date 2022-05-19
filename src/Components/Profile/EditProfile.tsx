import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useUpdateUser } from "../../api/UserQuery";
import { SvgEdit } from "../../elements/Icon/SvgEdit";
import { resizeFile } from "../../servers/resize";
import { MyProfile } from "../../recoil/MyProfile";

interface IForm {
  id?: string;
  nickName: string;
  url: string;
  about_me: string;
}

const EditProfile = () => {
  const [user, setUser] = useRecoilState(MyProfile);
  const [imgBase64, setImgBase64] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<IForm>();
  const { mutateAsync } = useUpdateUser();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (fileInput?.current?.files === null) return;
    const size = fileInput?.current?.files[0];
    const profile = {
      loginId: user?.loginId,
      nickname: data.nickName,
      profileImage: String(user?.profileImage),
      url: data.url,
      aboutMe: data.about_me,
    };
    if (size === undefined) {
      mutateAsync(profile).then(() => {
        setUser(profile);
        navigate(-1);
      });
    } else {
      const image = await resizeFile(size);
      const profile = {
        loginId: user?.loginId,
        nickname: data.nickName,
        profileImage: String(image),
        url: data.url,
        aboutMe: data.about_me,
      };
      mutateAsync(profile).then(() => {
        setUser(profile);
        navigate(-1);
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
    <>
      <div className="font-bold text-4xl text-left w-full pl-12 pb-12">
        <div>내 프로필 설정</div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center relative">
          <img
            className="rounded-full"
            width="244px"
            height="244px"
            alt=""
            src={imgBase64 ? imgBase64 : user?.profileImage}
          />
          <label
            className="flex justify-center items-center absolute w-12 h-12 rounded-full bg-white right-24 bottom-0"
            htmlFor="icon-button-file"
          >
            <input
              type="file"
              id="icon-button-file"
              className="hidden"
              onChange={onChange}
              ref={fileInput}
            />
            <IconButton aria-label="upload picture" component="span">
              <SvgEdit />
            </IconButton>
          </label>
        </div>
        <form className="flex flex-col space-y-6 mt-14 w-[440px]" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-center text-2xl h-14 rounded-md border-none"
            placeholder="닉네임"
            defaultValue={user?.nickname}
            {...register("nickName")}
          />
          <input
            className="text-center text-2xl h-14 rounded-md border-none"
            placeholder="URL"
            defaultValue={user?.url}
            {...register("url")}
          />
          <textarea
            className="text-center text-2xl h-[150px] rounded-md border-none resize-none"
            placeholder="자기소개"
            defaultValue={user?.aboutMe}
            {...register("about_me")}
          />
          <div className="text-right">
            <button className="w-32 h-10 p-2 bg-3 rounded-lg" type="submit">
              <span className="text-white text-xl">저장하기</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
