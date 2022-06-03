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
  createdTime?: string;
}

export interface IRoom {
  data: Room[];
}

export interface IRoomDetail {
  data: Room;
}

// 프로젝트 정보
export const useGetRoom = () => {
  return useQuery<IRoom, AxiosError, IRoom>("getProject", () => {
    return instance.get("api/projects/");
  });
};

// 프로젝트 상세
export const useGetRoomDetail = (postId: string) => {
  return useQuery<AxiosResponse, AxiosError, IRoomDetail>(["getProjectDetail", postId], () => {
    return instance.get(`api/projects/${postId}`);
  });
};

// 프로젝트 생성
export const usePostRoom = () => {
  return useMutation(async (post: Room) => {
    await instance.post("api/projects/", post);
  });
};

// 프로젝트 초대코드
export const usePostOpenRoom = () => {
  return useMutation(async (RoomId: string) => {
    await instance.post(`api/projects/invite?inviteCode=${RoomId}`, RoomId);
  });
};

// 프로젝트 삭제
export const useDelRoom = (postId: string) => {
  return useMutation(async () => {
    await instance
      .delete(`api/projects/${postId}`)
      .then()
      .catch((err) => alert(err));
  });
};

// 프로젝트 수정
export const useUpdateRoom = (postId: string) => {
  return useMutation(async (post: Room) => {
    await instance.patch(`api/projects/${postId}`, post);
  });
};

// 프로젝트 나가기
export const useExitRoom = (pjId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/projects/exit/${pjId}`);
  });
};

// 프로젝트 추방
export const useKickRoom = (pjId: string) => {
  return useMutation(async (loginId: string) => {
    await instance.delete(`api/projects/kick/${pjId}&${loginId}`);
  });
};

// 프로젝트 회원 복구
export const useInviteRoom = (pjId: string) => {
  return useMutation(async (loginId: string) => {
    await instance.patch(`api/projects/recovery/${pjId}&${loginId}`);
  });
};
