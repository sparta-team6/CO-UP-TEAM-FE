import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface Docs {
  title?: string;
  contents?: string;
  isLoading?: boolean;
  docId?: string;
  position?: number;
}

export interface IDocDetail {
  data: Docs;
}

export const useGetOneDoc = (docId: string) => {
  return useQuery<AxiosResponse, AxiosError, IDocDetail>(["getOneDoc", docId], () => {
    return instance.get(`api/folders/docs/?docId=${docId}`);
  });
};

export const useAddDoc = () => {
  return useMutation(async (Doc: Docs) => {
    await instance.post("api/folders/docs", Doc);
  });
};

export const useDelDoc = (docId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/folders/docs/?docId=${docId}`);
  });
};

export const useUpdateDoc = (docId: string) => {
  return useMutation(async (Doc: Docs) => {
    await instance.patch(`api/folders/docs/?docId=${docId}`, Doc);
  });
};
