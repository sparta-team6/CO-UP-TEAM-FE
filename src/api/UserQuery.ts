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
  url?: string;
  nickname?: string;
  aboutMe?: string;
}

export interface IUser {
  data: User[];
}

// 유저 프로젝트 정보
export const useGetProjectUser = (pjId: string) => {
  return useQuery<IUser, AxiosError>(["getUser", pjId], () => {
    return instance.get(`api/users/projects?pjId=${pjId}`);
  });
};

// 프로필 수정
export const useUpdateUser = () => {
  return useMutation(async (post: User) => {
    await instance.put("api/users/update", post).then(() => {
      SweetAlertHook(1000, "success", "프로필 수정 완료😊");
    });
  });
};

// 프로필 정보
export const useMyInfo = () => {
  return useQuery<IUser, AxiosError>("getMyInfo", () => {
    return instance.get("api/users/myInfo/");
  });
};

// 로그아웃
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

// 회원탈퇴
export const useLeaveUser = (loginId: string) => {
  return useMutation(async () => {
    await instance
      .delete(`/api/users/?loginId=${loginId}`)
      .then(() => {
        SweetAlertHook(1000, "success", "회원탈퇴 성공😊");
      })
      .catch(() => {
        SweetAlertHook(1000, "error", "회원탈퇴 실패😊");
      });
  });
};
