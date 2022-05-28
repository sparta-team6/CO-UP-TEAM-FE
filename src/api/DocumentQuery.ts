import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { docId } from "../recoil/AtomDocument";
import { instance } from "../servers/axios";

export interface Docs {
  title?: string;
  contents?: string;
  isFetching?: boolean;
  docId?: string;
  modifiedTime?: string;
  nickname?: string;
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
    await instance.post("api/folders/docs", Doc).then((res) => {
      setDocId(res.data.docId);
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
        title: "문서 등록 완료😊",
      });
    });
  });
};

export const useDelDoc = (docId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/folders/docs/?docId=${docId}`).then(() => {
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
        title: "문서 삭제 완료😊",
      });
    });
  });
};

export const useUpdateDoc = (docId: string) => {
  return useMutation(async (Doc: Docs) => {
    await instance.patch(`api/folders/docs/?docId=${docId}`, Doc).then(() => {
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
        title: "문서 수정 완료😊",
      });
    });
  });
};
