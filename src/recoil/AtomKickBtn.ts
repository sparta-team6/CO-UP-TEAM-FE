import { atom } from "recoil";

// 회원 추방관련 boolean
export const KickBtn = atom<boolean>({
  key: "kick",
  default: false,
});
