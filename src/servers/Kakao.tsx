import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../layout/LoadingPage";
import { instance } from "./axios";

// 카카오 로그인 인가코드
const Kakao = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const Kakao = async (code: string) => {
      return await instance
        .post(`/auth/kakao?code=${code}`)
        .then(() => {
          navigate("/projectList");
        })
        .catch(() => {
          navigate("/")
        });
    };
    if (code) {
      Kakao(code);
    }
  }, [code, navigate]);

  return <LoadingPage/>;
};

export default Kakao;
