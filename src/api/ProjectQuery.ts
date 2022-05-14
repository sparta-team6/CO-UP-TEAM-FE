import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";
// import { instance } from "../servers/axios";

export interface Room {
  pjId: number;
  thumbnail: string;
  title: string;
  summary: string;
  inviteCode?: number;
  id?: number;
}

export interface IRoom {
  data: Room[];
}

export interface IRoomDetail {
  data: Room;
}

export const useGetRoom = () => {
  return useQuery<IRoom, AxiosError>("getProject", () => {
    return axios.get("http://localhost:4000/projects");
  });
};

export const useGetRoomDetail = (postId: number) => {
  return useQuery<AxiosResponse, AxiosError, IRoomDetail>("getProjectDetail", () => {
    return axios.get(`http://localhost:4000/projects/${postId}`);
  });
};

export const usePostRoom = () => {
  return useMutation(async (post: Room) => {
    await axios.post("http://localhost:4000/projects", post);
  });
};

export const usePostOpenRoom = () => {
  return useMutation(async (RoomId: number) => {
    await instance.post("/api/projects/invite", RoomId);
  });
};

export const useDelRoom = (postId: string) => {
  return useMutation(async () => {
    await axios.delete(`http://localhost:4000/projects/${postId}`);
  });
};

export const useUpdateRoom = (postId: number) => {
  return useMutation(async (post: Room) => {
    await axios.put(`http://localhost:4000/projects/${postId}`, post);
  });
};
