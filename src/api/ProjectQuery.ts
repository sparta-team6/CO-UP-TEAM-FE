import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface Room {
  pjId?: string;
  thumbnail: string;
  title: string;
  summary: string;
  inviteCode?: string;
  projectRole?: string;
  modifiedTime?: string;
}

export interface IRoom {
  data: Room[];
}

export interface IRoomDetail {
  data: Room;
}

export const useGetRoom = () => {
  return useQuery<IRoom, AxiosError, IRoom>("getProject", () => {
    return instance.get("api/projects/");
  });
};

export const useGetRoomDetail = (postId: string) => {
  return useQuery<AxiosResponse, AxiosError, IRoomDetail>(["getProjectDetail", postId], () => {
    return instance.get(`api/projects/${postId}`);
  });
};

export const usePostRoom = () => {
  return useMutation(async (post: Room) => {
    await instance.post("api/projects/", post);
  });
};

export const usePostOpenRoom = () => {
  return useMutation(async (RoomId: string) => {
    await instance
      .post(`api/projects/invite?inviteCode=${RoomId}`, RoomId)
  });
};

export const useDelRoom = (postId: string) => {
  return useMutation(async () => {
    await instance
      .delete(`api/projects/${postId}`)
      .then()
      .catch((err) => alert(err));
  });
};

export const useUpdateRoom = (postId: string) => {
  return useMutation(async (post: Room) => {
    await instance
      .patch(`api/projects/${postId}`, post)
  });
};

export const useExitRoom = (pjId: string) => {
  return useMutation(async () => {
    await instance
      .delete(`api/projects/exit/${pjId}`)
  });
};

export const useKickRoom = (pjId: string) => {
  return useMutation(async (loginId: string) => {
    await instance
      .delete(`api/projects/kick/${pjId}&${loginId}`)
  });
};
