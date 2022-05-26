import { atom } from "recoil";

/* 컴포넌트 모달 하위 전달 */
export const HandleOpen = atom({
  key: "handleOpen",
  default: false,
});

/* 현재 입장한 프로젝트 정보 저장 */
export interface ProjectRoom {
  pjId: string;
  thumbnail: string;
  title: string;
  summary: string;
  inviteCode: string;
  projectRole: string;
}

export interface ProjectInviteCode {
  inviteCode: string;
}
