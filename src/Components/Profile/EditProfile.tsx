import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useLogOut, useUpdateUser } from "../../api/UserQuery";
import { SvgEdit } from "../../elements/Icon/SvgEdit";
import { resizeFile } from "../../servers/resize";
import { MyProfile } from "../../recoil/MyProfile";
import { removeTokenFromCookie } from "../../servers/Cookie";

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
      const image = await resizeFile(size, 244, 244, "base64");
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
  const { mutateAsync: Logout } = useLogOut();
  const onLogOut = () => {
    Logout()
      .then(() => {
        alert("안녕히가세여");
        navigate("/");
        removeTokenFromCookie();
      })
      .catch(() => {
        alert("로그인 실패");
      });
  };
  return (
    <>
      <div className="font-bold text-4xl sm:text-2xl text-left w-full pl-12 pb-12 sm:pl-6">
        <div>내 프로필 설정</div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center relative">
          <img
            className="rounded-full w-[244px] h-[244px] sm:w-[148px] sm:h-[148px]"
            alt=""
            src={imgBase64 ? imgBase64 : user?.profileImage}
          />
          <label
            className="flex justify-center items-center absolute w-12 h-12 sm:w-9 sm:h-9 rounded-full border bg-white right-24 bottom-0 sm:right-16"
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
        <form
          className="flex flex-col space-y-6 mt-14 sm:mt-6 w-[440px] sm:w-[288px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="text-center text-2xl h-14 rounded-md border-none sm:h-[36px] sm:text-base "
            placeholder="닉네임"
            defaultValue={user?.nickname}
            {...register("nickName")}
          />
          <input
            className="text-center text-2xl h-14 rounded-md border-none sm:h-[36px] sm:text-base "
            placeholder="URL"
            defaultValue={user?.url}
            {...register("url")}
          />
          <textarea
            className="text-center text-2xl h-[150px] sm:h-[74px] sm:text-base rounded-md border-none resize-none"
            placeholder="자기소개"
            defaultValue={user?.aboutMe}
            {...register("about_me")}
          />
          <div className="text-right">
            <button onClick={onLogOut} className="w-32 h-11 p-2 bg-5 rounded-lg mr-4 sm:mr-2" type="submit">
              <span className="text-white text-lg">로그아웃</span>
            </button>
            <button className="w-32 h-11 p-2 bg-3 rounded-lg" type="submit">
              <span className="text-white text-lg">저장하기</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
