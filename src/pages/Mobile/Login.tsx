import { Link } from "react-router-dom";
import GoogleLogin from "../../elements/IntroHome/GoogleLogin";
import KakaoLogin from "../../elements/IntroHome/KakaoLogin";
import NaverLogin from "../../elements/IntroHome/NaverLogin";

const Login = () => {
  return (
    <div className="w-full h-screen bg-[#ffffff] dark:bg-8">
      <div className="flex flex-col items-center pt-12">
        <span className="font-bold text-xl p-2">{`로그인을 해주세요:)`}</span>
        <KakaoLogin />
        <GoogleLogin />
        <NaverLogin />
      </div>
    </div>
  );
};

export default Login;
