import { useQuery } from "react-query";
import { instance } from "../servers/axios";

// 채팅 불러오기
export const useGetChatting = (pjId: string, size: number) => {
  return useQuery(["getChatting", pjId], () => {
    return instance.get(`api/chatting?pjId=${pjId}&size=${size}`);
  });
};

// 채팅 추가 불러오기
export const fetchChatting = (pjId: string, page: number) => {
  return instance.get(`api/chatting?pjId=${pjId}&id=${page}`);
};
