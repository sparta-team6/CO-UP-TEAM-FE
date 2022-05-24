import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface DFID {
  dfId: string;
}
export interface DOCID {
  docId: string;
}

export const dfId = atom({
  key: "dfId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const docId = atom({
  key: "docId",
  default: "",
});
