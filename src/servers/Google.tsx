import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "./axios";

const Google = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    const Google = async (code: string) => {
      return await instance
        .post(
          `/auth/google?code=${code}&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=none`
        )
        .then(() => {
          navigate("/projectList");
        })
        .catch((err) => {
          alert(err);
        });
    };
    if (code) {
      Google(code);
    }
  }, [code, navigate]);

  return <div>??</div>;
};

export default Google;
