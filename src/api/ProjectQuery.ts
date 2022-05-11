import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";

export interface Room {
  title: string;
  summary: string;
  img: string;
  name: string;
  id: number;
}

export interface IRoom {
  data: Room[];
}

export interface IRoomDetail {
  data: Room;
}

export const useGetRoom = () => {
  return useQuery<IRoom, AxiosError>("getProject", () => {
    return axios.get("http://localhost:4000/room");
  });
};

export const useGetRoomDetail = (postId: number) => {
  return useQuery<AxiosResponse, AxiosError, IRoomDetail>(
    "getProjectDetail",
    () => {
      return axios.get(`http://localhost:4000/room/${postId}`);
    }
  );
};

export const usePostRoom = () => {
  return useMutation(async (post: Room) => {
    await axios.post("http://localhost:4000/room", post);
  });
};

export const useDelRoom = (postId: string) => {
  return useMutation(async () => {
    await axios.delete(`http://localhost:4000/room/${postId}`);
  });
};

export const useUpdateRoom = (postId: number) => {
  return useMutation(async (post: Room) => {
    await axios.put(`http://localhost:4000/room/${postId}`, post);
  });
};
