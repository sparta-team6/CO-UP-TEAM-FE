import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const themeState = atom({
  key: "themeMode",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
