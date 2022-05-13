import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

interface IUserState {
  email: string;
  id: number;
  nickname: string;
  profile_image: string;
}

export const MyProfile = atom<IUserState>({
  key: "myProfile",
  default: {
    email: "",
    id: 0,
    nickname: "",
    profile_image: "",
  },
  effects_UNSTABLE: [persistAtom],
});
export const HandleOpen = atom({
  key: "handleOpen",
  default: false,
});