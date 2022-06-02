import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getAccessTokenFromCookie = () => {
  return cookies.get("accessToken");
};

export const getFreshTokenFromCookie = () => {
  return cookies.get("refreshToken");
};

