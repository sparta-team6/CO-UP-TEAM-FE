import { atom } from "recoil";
import { ProjectInviteCode } from "./AtomsInterface";

export const ProjectInvite = atom<ProjectInviteCode>({
  key: "projectInvite",
  default: {
    inviteCode: "",
  },
});
