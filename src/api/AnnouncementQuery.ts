import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

export interface Announcement {
  title?: string;
  content?: string;
  id: number;
  name?: string;
}

export interface IAnnouncement {
  data: Announcement[];
}

export const useGetAnnouncement = () => {
  return useQuery<IAnnouncement, AxiosError>("getAnnouncement", () => {
    return axios.get("https://627f98ccb1cc1b126257d400.mockapi.io/api/announcement");
  });
};

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
