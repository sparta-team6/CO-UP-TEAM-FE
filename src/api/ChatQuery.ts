import { useQuery } from "react-query";
import { instance } from "../servers/axios";

export const useGetChatting = (pjId: string, size: number) => {
  return useQuery(["getChatting", pjId], () => {
    return instance.get(`api/chatting?pjId=${pjId}&size=${size}`);
  });
};

export const fetchChatting = (pjId: string, page: number) => {
  return instance.get(`api/chatting?pjId=${pjId}&id=${page}`);
};
