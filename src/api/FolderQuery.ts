import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { dfId } from "../recoil/AtomDocument";
import { instance } from "../servers/axios";
import { Docs } from "./DocumentQuery";

export interface Folders {
  title?: string;
  dfId?: string;
  docs?: Docs[];
}

export interface IFolders {
  data: Folders[];
}

export interface Folder {
  pjId: string;
  title: string;
}

export const useGetFolders = (pjId: string) => {
  return useQuery<IFolders, AxiosError>("getFolders", () => {
    return instance.get(`api/folders/?pjId=${pjId}`);
  });
};

export const useAddFolder = () => {
  const setDfId = useSetRecoilState(dfId);
  return useMutation(async (Folder: Folder) => {
    await instance.post("api/folders/", Folder).then((res) => setDfId(res.data.dfId));
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
