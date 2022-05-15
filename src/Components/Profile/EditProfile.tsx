import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useUpdateUser } from "../../api/UserQuery";
import { MyProfile } from "../../recoil/Atoms";
import { resizeFile } from "../../servers/resize";

type IForm = {
  id?: string;
  nickName: string;
  url: string;
  about_me: string;
};

const EditProfile = () => {
  const [user, setUser] = useRecoilState(MyProfile);
  console.log(user);
  const [imgBase64, setImgBase64] = useState<string>("");
  const [imgFile, setImgFile] = useState();
  const fileInput = useRef<any>();
  const { register, handleSubmit } = useForm<IForm>();
  const { mutateAsync } = useUpdateUser();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const size = fileInput.current.files[0];
    const profile = {
      loginId: user.loginId,
      nickname: data.nickName,
      profileImage: user.profileImage,
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
      const Eprofile = {
        loginId: user.loginId,
        nickname: data.nickName,
        profileImage: String(image),
        url: data.url,
        aboutMe: data.about_me,
      };
      mutateAsync(Eprofile).then(() => {
        setUser(Eprofile);
        navigate(-1);
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
    <>
      <div className="font-bold text-3xl text-left w-full pl-12 pb-12">
        <div>내 프로필 설정</div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center relative">
          <img
            className="rounded-full"
            width="250px"
            height="250px"
            alt=""
            src={imgBase64 ? imgBase64 : user.profileImage}
          />
          <label
            className="text-right absolute w-9 h-9 rounded-full bg-white right-20 bottom-1"
            htmlFor="icon-button-file"
          >
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
        </div>
        <form className="flex flex-col space-y-6 mt-14 w-96" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-center p-2 rounded-md border-none"
            placeholder="닉네임"
            defaultValue={user.nickname}
            {...register("nickName")}
          />
          <input
            className="text-center p-2 rounded-md border-none"
            placeholder="URL"
            defaultValue={user.url}
            {...register("url")}
          />
          <textarea
            className="text-center p-2 rounded-md border-none resize-none"
            rows={5}
            placeholder="자기소개"
            defaultValue={user.aboutMe}
            {...register("about_me")}
          />
          <div className="text-right">
            <button className="p-2 bg-slate-300 rounded-xl w-32" type="submit">
              수정하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
