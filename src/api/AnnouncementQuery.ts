import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

// export interface Announcements {
//   pjId: string;
//   mbId: string;
//   title: string;
//   contents: string;
// }
export interface Announcement {
  title?: string;
  content?: string;
  id: number;
  name?: string;
}

export interface IAnnouncement {
  data: Announcement[];
}
// export interface IAnnouncements {
//   data: Announcements[];
// }

export const useGetAnnouncement = () => {
  return useQuery<IAnnouncement, AxiosError>("getAnnouncement", () => {
    return axios.get("https://627f98ccb1cc1b126257d400.mockapi.io/api/announcement");
  });
};

// export const useGetAnnouncements = (pjId: string) => {
//   return useQuery<IAnnouncements, AxiosError>("getAnnouncementss", () => {
//     return axios.get(`api/notices/all?pjId=${pjId}`);
//   });
// };

export const usePostAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await axios.post("https://627f98ccb1cc1b126257d400.mockapi.io/api/announcement", post);
  });
};

export const useDelAnnouncement = (postId: number) => {
  return useMutation(async () => {
    await axios.delete(`https://627f98ccb1cc1b126257d400.mockapi.io/api/announcement/${postId}`);
  });
};

export const useUpdateAnnouncement = (postId: number) => {
  return useMutation(async (post: Announcement) => {
    await axios.put(`https://627f98ccb1cc1b126257d400.mockapi.io/api/announcement/${postId}`, post);
  });
};
