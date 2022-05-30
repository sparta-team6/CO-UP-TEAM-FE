import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { instance } from "../servers/axios";
import { SweetAlertHook } from "../servers/Sweet";

export interface ICards {
  kbbId?: string;
  kbcId?: string;
  manager?: string;
  title: string;
  contents?: string;
  position?: number;
  managerNickname?: string;
  modifiedTime?: string;
}

export interface ICard {
  data: ICards;
}

export const useGetCardDetail = (kbcId: string) => {
  return useQuery<ICard, AxiosError>(["getCard", kbcId], () => {
    return instance.get(`api/buckets/cards/?kbcId=${kbcId}`);
  });
};

export const useDeleteCards = (post: string) => {
  return useMutation(async () => {
    await instance.delete(`api/buckets/cards?kbcId=${post}`).then(() => {
      SweetAlertHook(1000, "error", "카드 삭제 완료😊");
    });
  });
};

export interface Cards {
  kbcId: string;
  kbbId: string;
  title: string;
  manager: string;
  contents: string;
  managerNickname: string;
  modifiedTime?: string;
}

export const usePostCards = () => {
  return useMutation(async (post: ICards) => {
    await instance.post("api/buckets/cards/", post).then(() => {
      SweetAlertHook(1000, "success", "카드 등록 완료😊");
    });
  });
};
