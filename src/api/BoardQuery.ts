import { useQuery } from "react-query";
import { instance } from "../servers/axios";

export const useGetBoard = (pjId: string) => {
  return useQuery("getBoard", () => {
    return instance.get(`/api/buckets/?pjId=${pjId}`);
  });
};
