import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

export interface Folders {
  title?: string;
  contents?: string;
  id?: number;
  isLoading?: boolean;
}

export interface IFolders {
  data: Folders[];
}

export interface IFolderDetail {
  data: Folders;
}

export const useGetFolders = () => {
  return useQuery<IFolders, AxiosError>("getFolders", () => {
    return axios.get("http://localhost:4000/folders");
  });
};

export const useGetOneFolder = (id: number) => {
  return useQuery<AxiosResponse, AxiosError, IFolderDetail>(["getOneFolder", id], () => {
    return axios.get(`http://localhost:4000/folders/${id}`);
  });
};

export const useAddFolder = () => {
  return useMutation(async (folder: Folders) => {
    await axios.post("http://localhost:4000/folders", folder);
  });
};

export const useDelFolder = (postId: number) => {
  return useMutation(async () => {
    await axios.delete(`http://localhost:4000/folders/${postId}`);
  });
};

export const useUpdateFolder = (postId: number) => {
  return useMutation(async (post: Folders) => {
    await axios.put(`http://localhost:4000/folders/${postId}`, post);
  });
};
