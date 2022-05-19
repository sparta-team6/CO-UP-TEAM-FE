import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "../api/UserQuery";
import IMG from "../images/DuckProfile.jpg";

const { persistAtom } = recoilPersist();

/* 내 정보 저장 */
export const MyProfile = atom<User>({
  key: "myProfile",
  default: {
    loginId: "email",
    social: "KAKAO",
    profileImage: IMG,
    url: "www~~~",
    nickname: "JIHO",
    aboutMe: "안녕하세여",
  },
  effects_UNSTABLE: [persistAtom],
});
