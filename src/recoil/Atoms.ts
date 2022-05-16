import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Board } from "../api/BoardQuery";
import { User } from "../api/UserQuery";
import IMG from "../images/DuckProfile.jpg";

const { persistAtom } = recoilPersist();

/* 다크 모드 토글 구현 */
export const getTheme = () => {
  const LIGHT = "1";
  const DARK = "2";
  return LIGHT ? DARK : LIGHT;
};

export const themeState = atom({
  key: "themeMode",
  default: getTheme(),
  effects_UNSTABLE: [persistAtom],
});

/* 현재 로그인 유저 세션 저장
export const getSession = atom({
  key: "session",
  default: sessionStorage.getItem("token"),
}); */

export interface ITodo {
  id: number;
  text: string;
  name: string;
  comment: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

interface IBucketState {
  [key: number]: Board;
}

export const BoardState = atom<IBucketState>({
  key: "buckets",
  default: {
    0: {
      kbbId: "0",
      position: 0,
      title: "to_do",
      cards: [],
    },
    1: {
      kbbId: "0",
      position: 0,
      title: "doing",
      cards: [],
    },
    2: {
      kbbId: "0",
      position: 0,
      title: "done",
      cards: [],
    },
  },
});

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

export const HandleOpen = atom({
  key: "handleOpen",
  default: false,
});

export interface ProjectRoom {
  pjId: string;
  thumbnail: string;
  title: string;
  summary: string;
  inviteCode: string;
}

export const ProjectKey = atom<ProjectRoom>({
  key: "projectKey",
  default: {
    pjId: "",
    inviteCode: "",
    thumbnail: "",
    title: "",
    summary: "",
  },
  effects_UNSTABLE: [persistAtom],
});
