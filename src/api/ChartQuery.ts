import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface Charts {
  cards: [];
  kbbId: string;
  position: number;
  title: string;
}

export interface buckets {
  buckets: Charts[];
  loginId: string;
  nickname: string;
  profileImage: string;
}

export interface IChart {
  data: buckets[];
}

export const useGetManagers = (pjId: string) => {
  return useQuery<IChart, AxiosError>(["getManager", pjId], () => {
    return instance.get(`api/buckets/cards/managers/?pjId=${pjId}`);
  });
};
