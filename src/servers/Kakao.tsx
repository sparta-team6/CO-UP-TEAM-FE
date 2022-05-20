import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { MyProfile } from "../recoil/MyProfile";
import { instance } from "./axios";

const Kakao = () => {
  const SetUser = useSetRecoilState(MyProfile);
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const cookies = new Cookies();
  const now = new Date();
  const accessTime = new Date();
  const refreshTime = new Date();
  accessTime.setMinutes(now.getMinutes() + 5);
  refreshTime.setMinutes(now.getMinutes() + 15);
  useEffect(() => {
    const Kakao = async (code: string) => {
      return await instance
        .post(`/auth/kakao?code=${code}`)
        .then((res: any) => {
          cookies.set("accessToken", String(res.data.accessToken), {
            path: "/",
            expires: accessTime,
          });
          cookies.set("refreshToken", String(res.data.refreshToken), {
            path: "/",
            expires: refreshTime,
          });
          console.log(res);
          SetUser(res);
          navigate("/projectList");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (code) {
      Kakao(code);
    }
  }, [code, navigate]);

  return <div>??</div>;
};

export default Kakao;
