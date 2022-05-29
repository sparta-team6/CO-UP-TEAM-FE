import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { instance } from "../servers/axios";
import { SweetAlertHook } from "../servers/Sweet";

export interface Announcement {
  modifiedTime?: string;
  pjId?: string;
  title?: string;
  contents?: string;
  noticeId?: string;
}

export interface IAnnouncements {
  data: Announcement;
}

export interface IAnnouncement {
  data: Announcement[];
}

export const useGetAnnouncement = (pjId: string) => {
  return useQuery<IAnnouncement, AxiosError>(["getAnnouncement", pjId], () => {
    return instance.get(`api/notices/all?pjId=${pjId}`);
  });
};

export const useGetOneAnnouncement = (noticeId: string) => {
  return useQuery("getOneAnnouncement", () => {
    return instance.get(`api/notices/?noticeId=${noticeId}`);
  });
};

export const usePostAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await instance.post("api/notices/", post).then(() => {
      SweetAlertHook(1000, "success", "공지사항 등록 완료😊");
    });
  });
};

export const useUpdateAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await instance.patch("api/notices/", post).then(() => {
      SweetAlertHook(1000, "success", "공지사항 수정 완료😊");
    });
  });
};

export const useDelAnnouncement = () => {
  return useMutation(async (post: IAnnouncements) => {
    await instance.delete("api/notices/", post).then(() => {
      SweetAlertHook(1000, "error", "공지사항 삭제 완료😊");
    });
  });
};
