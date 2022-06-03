import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Docs } from "../api/DocumentQuery";

const { persistAtom } = recoilPersist();

export interface DFID {
  dfId: string;
}
export interface DOCID {
  docId: string;
}

// 폴더id, 문서id
export const dfId = atom({
  key: "dfId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const docId = atom({
  key: "docId",
  default: "",
});

// 최신 문서 정보 저장
export const NewDoc = atom<Docs>({
  key: "newDoc",
  default: {
    title: "",
    contents: "",
    docId: "",
    modifiedTime: "",
    nickname: "",
    isFetching: true,
  },
});
