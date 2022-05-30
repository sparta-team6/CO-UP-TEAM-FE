import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../layout/LoadingPage";
import { instance } from "./axios";

const Naver = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const Naver = async (code: string) => {
      return await instance
        .post(`/auth/naver?code=${code}`)
        .then(() => {
          navigate("/projectList");
        })
        .catch(() => {
          navigate("/")
        });
    };
    if (code) {
      Naver(code);
    }
  }, [code, navigate]);

  return <LoadingPage />;
};

export default Naver;
