import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

import { instance } from "../servers/axios";

export interface ICards {
  kbbId?: string;
  kbcId?: string;
  manager?: string;
  title: string;
  contents?: string;
  position?: number;
  managerNickname?: string;
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
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "카드 삭제 완료😊",
      });
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
}

export const usePostCards = () => {
  return useMutation(async (post: ICards) => {
    await instance.post("api/buckets/cards/", post).then(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "카드 등록 완료😊",
      });
    });
  });
};
