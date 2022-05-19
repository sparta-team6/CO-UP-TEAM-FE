import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import IMG from "../images/DuckProfile.jpg";

const { persistAtom } = recoilPersist();

/* 내 정보 저장 */
export const MyProfile = atom({
  key: "myProfile",
  default: {
    loginId: "",
    social: "",
    profileImage: IMG,
    url: "",
    nickname: "",
    aboutMe: "",
  },
  effects_UNSTABLE: [persistAtom],
});
