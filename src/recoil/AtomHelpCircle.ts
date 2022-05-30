import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const HelpProjectList = atom({
  key: "helpProjectList",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const HelpToolMain = atom({
  key: "helpToolMain",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
