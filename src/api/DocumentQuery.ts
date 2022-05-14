import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

export interface Docs {
  title?: string;
  contents?: string;
  id?: number;
  isLoading?: boolean;
  docId?: number;
}

export interface IDocs {
  data: Docs[];
}

export interface IDocDetail {
  data: Docs;
}

export const useGetDocs = () => {
  return useQuery<IDocs, AxiosError>("getDocs", () => {
    return axios.get("http://localhost:4000/Docs");
  });
};

export const useGetOneDoc = (id: number) => {
  return useQuery<AxiosResponse, AxiosError, IDocDetail>(["getOneDoc", id], () => {
    return axios.get(`http://localhost:4000/Docs/${id}`);
  });
};

export const useAddDoc = () => {
  return useMutation(async (Doc: Docs) => {
    await axios.post("http://localhost:4000/Docs", Doc);
  });
};

export const useDelDoc = (docId: number) => {
  return useMutation(async () => {
    await axios.delete(`http://localhost:4000/Docs/${docId}`);
  });
};

export const useUpdateDoc = (docId: number) => {
  return useMutation(async (doc: Docs) => {
    await axios.put(`http://localhost:4000/Docs/${docId}`, doc);
  });
};
