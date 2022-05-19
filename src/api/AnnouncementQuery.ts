import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface Announcement {
  pjId ?: string;
  title: string;
  contents: string;
  noticeId?: string;
}

export interface IAnnouncements {
  data: Announcement;
}

export interface IAnnouncement {
  data: Announcement[];
}

export const useGetAnnouncement = (pjId: string) => {
  return useQuery<IAnnouncement, AxiosError>("getAnnouncement", () => {
    return instance.get(`api/notices/all?pjId=${pjId}`);
  });
};

export const usePostAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await instance.post("api/notices/", post);
  });
};

export const useUpdateAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await instance.patch("api/notices/", post);
  });
};

export const useDelAnnouncement = (noticeId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/notices/?noticeId=${noticeId}`);
  });
};
