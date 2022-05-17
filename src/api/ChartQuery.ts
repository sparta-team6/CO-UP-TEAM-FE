import { useQuery } from "react-query";
import { instance } from "../servers/axios";

export const useGetManagers = (pjId: string) => {
  return useQuery("getManager", () => {
    return instance.get(`api/buckets/cards/managers/?pjId=${pjId}`);
  });
};
