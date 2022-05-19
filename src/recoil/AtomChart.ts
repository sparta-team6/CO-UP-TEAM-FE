import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/* 전체 차트 그래프 정보 저장 */
export const ChartLength = atom<number[]>({
  key: "chartLength",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
