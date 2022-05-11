import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

export interface User {
  id: number;
  name: string;
  profile: string;
  URL: string;
  comment: string;
}

export interface IUser {
  data: User[];
}

export const useGetProjectUser = () => {
  return useQuery<IUser, AxiosError>("getUser", () => {
    return axios.get("http://localhost:4000/user");
  });
};

export const useAddUser = () => {
  return useMutation(async (post: User) => {
    await axios.post("http://localhost:4000/user", post);
  });
};
