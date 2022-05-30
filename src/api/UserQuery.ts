import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { HelpProjectList, HelpToolMain } from "../recoil/AtomHelpCircle";
import { instance } from "../servers/axios";
import { SweetAlertHook } from "../servers/Sweet";

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
      SweetAlertHook(1000, "success", "프로필 수정 완료😊");
    });
  });
};

export const useMyInfo = () => {
  return useQuery<IUser, AxiosError>("getMyInfo", () => {
    return instance.get("api/users/myInfo/");
  });
};

export const useLogOut = () => {
  const setHelpProject = useSetRecoilState(HelpProjectList);
  const setHelpToolMain = useSetRecoilState(HelpToolMain);
  return useMutation(async () => {
    await instance
      .delete("/auth/logout/")
      .then(() => {
        SweetAlertHook(1000, "success", "로그아웃 성공😊");
        setHelpProject(false);
        setHelpToolMain(false);
      })
      .catch(() => {
        SweetAlertHook(1000, "error", "로그아웃 실패😥");
      });
  });
};
