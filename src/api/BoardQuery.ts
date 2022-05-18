import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "..";
import { instance } from "../servers/axios";

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

interface ICard {
  data: ICards;
}

export const useGetCardDetail = (kbcId: string) => {
  return useQuery<ICard, AxiosError>(["getCard", kbcId], () => {
    return instance.get(`api/buckets/cards/?kbcId=${kbcId}`);
  });
};

interface ICard {
  data: ICards;
}

export const useGetCardDetail = (kbcId: string) => {
  return useQuery<ICard, AxiosError>(["getCard", kbcId], () => {
    return instance.get(`api/buckets/cards/?kbcId=${kbcId}`);
  });
};

interface TestBoard {
  pjId: string;
  title: string;
  position: number;
}

export const usePostBoard = () => {
  return useMutation(async (post: TestBoard) => {
    await instance.post("api/buckets/", post).then((res) => {
      console.log(res);
    });
  });
};

export interface ICards {
  kbbId?: string;
  kbcId?: string;
  manager?: string;
  title: string;
  contents?: string;
  position: number;
}

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

// 버킷 생성 테스트 공간

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
