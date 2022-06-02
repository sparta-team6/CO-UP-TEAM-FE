import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useLeaveUser, useLogOut, useUpdateUser } from "../../api/UserQuery";
import { SvgEdit } from "../../elements/Icon/SvgEdit";
import { resizeFile } from "../../servers/resize";
import { MyProfile } from "../../recoil/MyProfile";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { SweetAlertHook } from "../../servers/Sweet";
import DefaultImg1 from "../../images/Profile/COUP_square_대지 1.png";
import DefaultImg2 from "../../images/Profile/COUP_square-02.png";
import DefaultImg3 from "../../images/Profile/COUP_square-03.png";
import DefaultImg4 from "../../images/Profile/COUP_square-04.png";
import DefaultImg5 from "../../images/Profile/COUP_square-05.png";

interface IForm {
  id?: string;
  nickName: string;
  url: string;
  about_me: string;
}

const EditProfile = () => {
  const [cookies, _, removeCookie] = useCookies(["accessToken", "refreshToken"]);
  const [user, setUser] = useRecoilState(MyProfile);
  const RandomImg = [DefaultImg1, DefaultImg2, DefaultImg3, DefaultImg4, DefaultImg5];
  const DefaultImg = Math.floor(Math.random() * RandomImg.length);
  const [imgBase64, setImgBase64] = useState<string>(RandomImg[DefaultImg]);
  const fileInput = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<IForm>();
  const { mutateAsync } = useUpdateUser();
  const { mutateAsync: Leave } = useLeaveUser(String(user.loginId));
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (fileInput?.current?.files === null) return;
    if (data.nickName.trim() === "") {
      SweetAlertHook(1000, "error", "닉네임을 입력해주세요😕");
      return;
    }
    const size = fileInput?.current?.files[0];
    const profile = {
      loginId: user?.loginId,
      nickname: data.nickName,
      profileImage: imgBase64,
      url: data.url,
      aboutMe: data.about_me,
    };
    if (size === undefined) {
      mutateAsync(profile).then(() => {
        setUser(profile);
        navigate(-1);
      });
    } else {
      const image = await resizeFile(size, 36, 36, "base64");
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
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        Logout().then(() => {
          removeCookie("accessToken");
          removeCookie("refreshToken");
          navigate("/");
        });
      }
    });
  };

  const onLeave = () => {
    Swal.fire({
      title: "회원탈퇴 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "회원탈퇴",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        Leave().then(() => {
          removeCookie("accessToken");
          removeCookie("refreshToken");
          navigate("/");
        });
      }
    });
  };
  return (
    <>
      <div className="font-bold text-4xl sm:text-2xl text-left w-full px-12 pb-12 sm:px-6 flex justify-between">
        <span>내 프로필 설정</span>
        <button
          onClick={() => navigate(-1)}
          className="w-[160px] h-[48px] sm:w-[80px] sm:h-[32px] hover:text-3 text-xl sm:text-sm cursor-pointer bg-[#D7DcE5] rounded-md"
        >
          뒤로가기
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center relative">
          <img
            className="rounded-full w-[180px] h-[180px] sm:w-[130px] sm:h-[130px]"
            alt=""
            src={imgBase64 ? imgBase64 : user?.profileImage}
          />
          <label
            className="flex justify-center items-center absolute w-12 h-12 sm:w-9 sm:h-9 rounded-full border bg-white right-[120px] bottom-0 sm:right-[70px]"
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
          className="flex flex-col space-y-6 sm:space-y-4 mt-[22px] sm:mt-[10px] w-[440px] sm:w-[288px] relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            className="rounded-full w-[56px] h-[56px] sm:w-[36px] sm:h-[36px] absolute top-[24px] left-4 sm:top-[16px]"
            alt=""
            src={user?.profileImage}
          />
          <input
            className="text-center text-2xl h-14 rounded-md border-none sm:h-[36px] sm:text-base  dark:bg-6"
            placeholder="닉네임 (12자 이내)"
            defaultValue={user?.nickname}
            maxLength={12}
            {...register("nickName")}
          />
          <input
            className="text-center text-2xl h-14 rounded-md border-none sm:h-[36px] sm:text-base  dark:bg-6"
            placeholder="URL (40자 이내)"
            defaultValue={user?.url}
            maxLength={40}
            {...register("url")}
          />
          <textarea
            className="text-center text-2xl h-[150px] sm:h-[74px] sm:text-base rounded-md border-none resize-none dark:bg-6"
            placeholder="자기소개 (254자 이내)"
            defaultValue={user?.aboutMe}
            maxLength={254}
            {...register("about_me")}
          />
          <div className="text-center sm:pt-[10px]">
            <button className="w-full h-[52px] sm:h-[48px] hover:bg-h1 bg-3 rounded" type="submit">
              <span className="text-white text-xl sm:text-base">저장하기</span>
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={onLogOut} className="mt-[5px]" type="button">
              <span className="text-[#999] text-lg sm:text-base hover:text-3">로그아웃</span>
            </button>
            <div className="w-[1px] h-[22px] sm:h-[20px] border-r-[1px] border-solid border-[#B0B0B0] mx-[27px] sm:mx-[24px]"></div>
            <button onClick={onLeave} className="mt-[5px]" type="button">
              <span className="text-[#999] text-lg sm:text-base hover:text-[#E24412]">
                회원탈퇴
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
