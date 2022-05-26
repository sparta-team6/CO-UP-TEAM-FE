import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ProjectRoom } from "./AtomsInterface";

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
