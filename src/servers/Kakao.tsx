import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { MyProfile } from "../recoil/Atoms";
import { instance } from "./axios";

const Kakao = () => {
  const user = useSetRecoilState(MyProfile);
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(typeof code);
  useEffect(() => {
    const Kakao = async (code: string) => {
      return await instance
        .post(`/auth/kakao?code=${code}`)
        .then((res) => {
          const result = res?.data;
          console.log(result);
          user(result);
          navigate("/projectlist");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (code) {
      Kakao(code);
    }
  }, [code, navigate, user]);

  return <div>??</div>;
};

export default Kakao;
