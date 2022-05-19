import { queryClient } from "..";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { instance } from "../servers/axios";

export interface ICards {
  kbbId?: string;
  kbcId?: string;
  manager?: string;
  title: string;
  contents?: string;
  position: number;
}

interface ICard {
  data: ICards;
}

export const useGetCardDetail = (kbcId: string) => {
  return useQuery<ICard, AxiosError>(["getCard", kbcId], () => {
    return instance.get(`api/buckets/cards/?kbcId=${kbcId}`);
  });
};

export const useUpdateCards = (pjId: string) => {
  return useMutation(async (post: Cards) => {
    await instance.patch("api/buckets/cards", post).then(() => {
      queryClient.invalidateQueries(["getBoard", pjId]);
    });
  });
};

export const useDeleteCards = (post: string) => {
  return useMutation(async () => {
    await instance.delete(`api/buckets/cards?kbcId=${post}`);
  });
};


export interface Cards {
  kbcId: string;
  kbbId: string;
  title: string;
  manager: string;
  contents: string;
  position: number;
}

export const usePostCards = () => {
  return useMutation(async (post: ICards) => {
    await instance.post("api/buckets/cards/", post);
  });
};
