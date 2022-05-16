import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";
import { Docs } from "./DocumentQuery";

export interface Folders {
  title?: string;
  isLoading?: boolean;
  dfId?: string;
  position?: number;
  docs?: Docs[];
}

export interface IFolders {
  data: Folders[];
}

export interface Folder {
  pjId: string;
  title: string;
  position: number;
}

export const useGetFolders = (pjId: string) => {
  return useQuery<IFolders, AxiosError>("getFolders", () => {
    return instance.get(`api/folders/?pjId=${pjId}`);
  });
};

export const useAddFolder = () => {
  return useMutation(async (Folder: Folder) => {
    await instance.post("api/folders/", Folder);
  });
};

export const useDelFolder = (dfId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/folders/?dfId=${dfId}`);
  });
};

export const useUpdateFolder = (dfId: string) => {
  return useMutation(async (Folder: Folders) => {
    await instance.patch(`api/folders/?dfId=${dfId}`, Folder);
  });
};
