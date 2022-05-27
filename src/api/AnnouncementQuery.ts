import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

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
    await instance.post("api/notices/", post);
  });
};

export const useUpdateAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await instance.patch("api/notices/", post);
  });
};

export const useDelAnnouncement = () => {
  return useMutation(async (post: IAnnouncements) => {
    await instance
      .delete("api/notices/", post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
