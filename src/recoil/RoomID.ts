import { atom } from "recoil";
import { ProjectRoom } from "./AtomsInterface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 해당 프로젝트의 정보
export const ProjectKey = atom<ProjectRoom>({
  key: "projectKey",
  default: {
    pjId: "",
    inviteCode: "",
    thumbnail: "",
    title: "",
    summary: "",
    projectRole: "",
  },
  effects_UNSTABLE: [persistAtom],
});
