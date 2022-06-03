import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 튜토리얼 버튼 관련 boolean
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
