import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { docId, NewDoc } from "../recoil/AtomDocument";
import { instance } from "../servers/axios";
import { SweetAlertHook } from "../servers/Sweet";

export interface Docs {
  title?: string;
  contents?: string;
  isFetching?: boolean;
  isFetchingg?: boolean;
  docId?: string;
  modifiedTime?: string;
  nickname?: string;
}

export interface IDocDetail {
  data: Docs;
}

// 문서 조회
export const useGetOneDoc = (docId: string) => {
  return useQuery<AxiosResponse, AxiosError, IDocDetail>(["getOneDoc", docId], () => {
    return instance.get(`api/folders/docs/?docId=${docId}`);
  });
};

// 최신 문서 조회
export const useGetNewDoc = (pjId: string) => {
  const setNewDoc = useSetRecoilState(NewDoc);
  return useQuery("getNewDoc", async () => {
    await instance.get(`api/folders/docs/new?pjId=${pjId}`).then((res) => setNewDoc(res.data));
  });
};

// 문서 생성
export const useAddDoc = () => {
  const setDocId = useSetRecoilState(docId);
  return useMutation(async (Doc: Docs) => {
    await instance.post("api/folders/docs", Doc).then((res) => {
      setDocId(res.data.docId);
      SweetAlertHook(1000, "success", "문서 등록 완료😊");
    });
  });
};

// 문서 삭제
export const useDelDoc = (docId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/folders/docs/?docId=${docId}`).then(() => {
      SweetAlertHook(1000, "error", "문서 삭제 완료😊");
    });
  });
};

// 문서 수정
export const useUpdateDoc = (docId: string) => {
  return useMutation(async (Doc: Docs) => {
    await instance.patch(`api/folders/docs/?docId=${docId}`, Doc).then(() => {
      SweetAlertHook(1000, "success", "문서 수정 완료😊");
    });
  });
};
