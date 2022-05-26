import { atom } from "recoil";
import { ProjectRoom } from "./AtomsInterface";

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
});
