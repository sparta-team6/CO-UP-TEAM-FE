import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookieAccess = (value: string) => {
  return cookies.set("accessToken", value);
};

export const setCookieRefresh = (value: string) => {
  return cookies.set("refreshToken", value);
};

export const getAccessTokenFromCookie = () => {
  return cookies.get("accessToken");
};

export const getFreshTokenFromCookie = () => {
  return cookies.get("refreshToken");
};

export const removeTokenFromCookie = () => {
  cookies.remove("token");
};
