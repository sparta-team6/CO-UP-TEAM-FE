import { atom } from "recoil";

export const KickBtn = atom<boolean>({
  key: "kick",
  default: false,
});
