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
    return axios.get("https://627f98ccb1cc1b126257d400.mockapi.io/api/chat");
  });
};

export const useAddChatComment = () => {
  return useMutation(async (post: Chat) => {
    await axios.post("https://627f98ccb1cc1b126257d400.mockapi.io/api/chat43",post);
  });
};
