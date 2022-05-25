import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        .catch((err) => {
          alert(err);
        });
    };
    if (code) {
      Naver(code);
    }
  }, [code, navigate]);

  return <div>??</div>;
};

export default Naver;
