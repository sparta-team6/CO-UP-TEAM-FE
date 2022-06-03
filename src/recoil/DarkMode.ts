import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 다크모드 boolean
export const themeState = atom({
  key: "themeMode",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
