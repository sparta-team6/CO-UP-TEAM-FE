import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

export interface Chat {
  name: string;
  profile: string;
  comment: string;
  createAt: number;
}

export interface IChat {
  data: Chat[];
}

export const useGetChatComment = () => {
  return useQuery<IChat, AxiosError>("getChat", () => {
    return axios.get(String(process.env.REACT_APP_CHAT_SOCKET));
  });
};

export const useAddChatComment = () => {
  return useMutation(async (post: Chat) => {
    await axios.post(String(process.env.REACT_APP_CHAT_SOCKET), post);
  });
};
