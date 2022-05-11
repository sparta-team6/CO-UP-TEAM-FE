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
    return axios.get("http://localhost:4000/announcement");
  });
};

export const usePostAnnouncement = () => {
  return useMutation(async (post: Announcement) => {
    await axios.post("http://localhost:4000/announcement", post);
  });
};

export const useDelAnnouncement = (postId: number) => {
  return useMutation(async () => {
    await axios.delete(`http://localhost:4000/announcement/${postId}`);
  });
};

export const useUpdateAnnouncement = (postId: number) => {
  return useMutation(async (post: Announcement) => {
    await axios.put(`http://localhost:4000/announcement/${postId}`, post);
  });
};
