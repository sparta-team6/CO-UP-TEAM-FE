import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface Board {
  kbbId: string;
  title: string;
  position: number;
  cards: Cards[];
}

export interface IBoard {
  data: Board[] | any;
}

export const useGetBoard = (pjId: string) => {
  return useQuery<IBoard, AxiosError>("getBoard", () => {
    return instance.get(`api/buckets/?pjId=${pjId}`);
  });
};

export const usePostBoard = () => {
  return useMutation(async (post: Board) => {
    await instance.post("api/buckets/", post).then((res) => {
      console.log(res);
    });
  });
};

export interface ICards {
  kbbId: string;
  manager: string;
  title: string;
  contents: string;
  position: number;
}

export interface Cards {
  kbcId: string;
  title: string;
  manager: string;
  contents: string;
  position: number;
}

export const usePostCards = () => {
  return useMutation(async (post: ICards) => {
    await instance.post("api/buckets/cards", post).then((res) => {
      alert(res);
    });
  });
};

// export const useUpdateCards = (kbbId: string) => {
//   return useMutation(async (post: Cards) => {
//     await instance.patch("api/buckets/cards", post).then((res) => {
//       alert(res);
//     });
//   });
// };
