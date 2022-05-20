import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/* 내 정보 저장 */
export const MyProfile = atom({
  key: "myProfile",
  default: {
    loginId: "",
    social: "",
    profileImage: "",
    url: "",
    nickname: "",
    aboutMe: "",
  },
  effects_UNSTABLE: [persistAtom],
});
