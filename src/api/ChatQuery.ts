import { useQuery } from "react-query";
import { instance } from "../servers/axios";

export const useGetChatting = (pjId: string) => {
  return useQuery(["getChatting", pjId], () => {
    return instance.get(`api/chatting?pjId=${pjId}`);
  });
};

export const fetchChatting = (pjId: string, page: number) => {
  return instance.get(`api/chatting?pjId=${pjId}&id=${page}`);
};
