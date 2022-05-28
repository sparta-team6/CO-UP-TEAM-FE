import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
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
    await instance.delete(`api/folders/?dfId=${dfId}`).then(() => {
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
        title: "폴더 삭제 완료😊",
      });
    });
  });
};

export const useUpdateFolder = (dfId: string) => {
  return useMutation(async (Folder: Folders) => {
    await instance.patch(`api/folders/?dfId=${dfId}`, Folder).then(() => {
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
        title: "폴더 제목 수정 완료😊",
      });
    });
  });
};
