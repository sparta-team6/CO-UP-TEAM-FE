import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "./axios";

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
        .catch((err) => {
          alert(err);
        });
    };
    if (code) {
      Kakao(code);
    }
  }, [code, navigate]);

  return <div>??</div>;
};

export default Kakao;
