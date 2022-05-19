import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface User {
  loginId: string;
  social?: string;
  profileImage: string;
  url: string;
  nickname: string;
  aboutMe: string;
}

export interface IUser {
  data: User[];
}

export const useGetProjectUser = (pjId: string) => {
  return useQuery<IUser, AxiosError>("getUser", () => {
    return instance.get(`api/users/projects/?pjId=${pjId}`);
  });
};

export const useUpdateUser = () => {
  return useMutation(async (post: User) => {
    await instance.put("api/users/update", post);
  });
};

export const useMyInfo = () => {
  return useQuery("getMyInfo", () => {
    return instance.get("api/users/myInfo/");
  });
};

export const useLogOut = () => {
  return useMutation(async () => {
    await instance.delete("api/users/logout/");
  });
};
