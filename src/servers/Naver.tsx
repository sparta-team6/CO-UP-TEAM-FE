import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { instance } from "./axios";

const Naver = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const cookies = new Cookies();
  const now = new Date();
  const accessTime = new Date();
  const refreshTime = new Date();
  accessTime.setMinutes(now.getMinutes() + 5);
  refreshTime.setMinutes(now.getMinutes() + 15);
  useEffect(() => {
    const Naver = async (code: string) => {
      return await instance
        .post(`/auth/naver?code=${code}`)
        .then((res: any) => {
          cookies.set("accessToken", String(res.data.accessToken), {
            path: "/",
            expires: accessTime,
          });
          cookies.set("refreshToken", String(res.data.refreshToken), {
            path: "/",
            expires: refreshTime,
          });
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
