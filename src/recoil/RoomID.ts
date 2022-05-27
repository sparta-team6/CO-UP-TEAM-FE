import { atom } from "recoil";
import { ProjectRoom } from "./AtomsInterface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
