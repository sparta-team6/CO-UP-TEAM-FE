import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useLogOut, useUpdateUser } from "../../api/UserQuery";
import { SvgEdit } from "../../elements/Icon/SvgEdit";
import { resizeFile } from "../../servers/resize";
import { MyProfile } from "../../recoil/MyProfile";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

interface IForm {
  id?: string;
  nickName: string;
  url: string;
  about_me: string;
}

const EditProfile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, _, removeCookie] = useCookies(["accessToken", "refreshToken"]);
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
      Swal.fire({
        title: "수정",
        text: "진짜 수정하시겠어요?!!",
        showCancelButton: true,
        confirmButtonText: "넵!",
        cancelButtonText: "취소!",
      }).then((result) => {
        if (result.value) {
          mutateAsync(profile).then(() => {
            setUser(profile);
            navigate(-1);
          });
        }
      });
    } else {
      const image = await resizeFile(size, 50, 50, "base64");
      const profile = {
        loginId: user?.loginId,
        nickname: data.nickName,
        profileImage: String(image),
        url: data.url,
        aboutMe: data.about_me,
      };
      Swal.fire({
        title: "수정",
        text: "진짜 수정하시겠어요?!!",
        showCancelButton: true,
        confirmButtonText: "넵!",
        cancelButtonText: "취소!",
      }).then((result) => {
        if (result.value) {
          mutateAsync(profile).then(() => {
            setUser(profile);
            navigate(-1);
          });
        }
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
    if (confirm("로그아웃 하시겠습니까?")) {
      Logout()
        .then(() => {
          alert("안녕히가세여");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          navigate("/");
        })
        .catch(() => {
          alert("로그인 실패");
        });
    }
  };
  return (
    <>
      <div className="font-bold text-4xl sm:text-2xl text-left w-full pl-12 pb-12 sm:pl-6">
        <span>내 프로필 설정</span>
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
            maxLength={80}
            {...register("url")}
          />
          <textarea
            className="text-center text-2xl h-[150px] sm:h-[74px] sm:text-base rounded-md border-none resize-none"
            placeholder="자기소개"
            defaultValue={user?.aboutMe}
            maxLength={254}
            {...register("about_me")}
          />
          <div className="text-center sm:pt-[10px]">
            <button
              onClick={onLogOut}
              className="w-[160px] h-[48px] sm:w-[124px] sm:h-[40px] bg-[#D7DCE5] rounded-xl sm:rounded-[4px] mr-[27px] sm:mr-[6px]"
              type="button"
            >
              <span className="text-white text-lg sm:text-base">로그아웃</span>
            </button>
            <button
              className="w-[160px] h-[48px] sm:w-[124px] sm:h-[40px] bg-3 rounded-xl sm:rounded-[4px]"
              type="submit"
            >
              <span className="text-white text-lg sm:text-base">저장하기</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
