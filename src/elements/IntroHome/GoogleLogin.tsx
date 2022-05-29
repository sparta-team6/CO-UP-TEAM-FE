import { GOOGLE_AUTH_URL } from "../../servers/OAuth";
import Google from "../../images/Login/GoogleLogin.jpg";

const GoogleLogin = () => {
  const onClick = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  return (
    <div onClick={onClick} className="relative">
      <button className="w-[314px] h-[54px] text-black bg-white mt-[24px] rounded-lg">
        구글 로그인
      </button>
      <img width={40} height={40} src={Google} alt="" className="top-[31px] left-10 absolute" />
    </div>
  );
};

export default GoogleLogin;
