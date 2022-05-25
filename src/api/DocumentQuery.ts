import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { docId } from "../recoil/AtomDocument";
import { instance } from "../servers/axios";

export interface Docs {
  title?: string;
  contents?: string;
  isFetching?: boolean;
  docId?: string;
  modifiedTime?: string;
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
  const setDocId = useSetRecoilState(docId);
  return useMutation(async (Doc: Docs) => {
    await instance.post("api/folders/docs", Doc).then((res) => setDocId(res.data.docId));
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
