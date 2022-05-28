import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { instance } from "../servers/axios";

export interface User {
  loginId?: string;
  social?: string;
  profileImage?: string;
  url: string;
  nickname: string;
  aboutMe: string;
}

export interface IUser {
  data: User[];
}

export const useGetProjectUser = (pjId: string) => {
  return useQuery<IUser, AxiosError>(["getUser", pjId], () => {
    return instance.get(`api/users/projects?pjId=${pjId}`);
  });
};

export const useUpdateUser = () => {
  return useMutation(async (post: User) => {
    await instance.put("api/users/update", post).then(() => {
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
        icon: "success",
        title: "프로필 수정 완료😊",
      });
    });
  });
};

export const useMyInfo = () => {
  return useQuery<IUser, AxiosError>("getMyInfo", () => {
    return instance.get("api/users/myInfo/");
  });
};

export const useLogOut = () => {
  return useMutation(async () => {
    await instance
      .delete("/auth/logout/")
      .then(() => {
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
          icon: "success",
          title: "로그아웃 성공😊",
        });
      })
      .catch(() => {
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
          title: "로그아웃 실패😊",
        });
      });
  });
};
