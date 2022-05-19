import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { instance } from "../servers/axios";
import { Cards } from "./CardQuery";

export interface Board {
  kbbId: string;
  title: string;
  position: number;
  cards: Cards[] | any;
}

export interface IBoard {
  data: Board[];
}

export const useGetBoard = (pjId: string) => {
  return useQuery<IBoard, AxiosError>(["getBoard", pjId], async () => {
    return await instance.get(`api/buckets/?pjId=${pjId}`);
  });
};

interface PostBoard {
  pjId: string;
  title: string;
  position: number;
}

export const usePostBoard = () => {
  return useMutation(async (post: PostBoard) => {
    await instance.post("api/buckets/", post);
  });
};
