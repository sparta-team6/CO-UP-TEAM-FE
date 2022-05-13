import GoogleLogin from "../../elements/IntroHome/GoogleLogin";
import KakaoLogin from "../../elements/IntroHome/KakaoLogin";
import NaverLogin from "../../elements/IntroHome/NaverLogin";

const Login = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <span className="font-bold text-xl p-8">{`로그인을 해주세요:)`}</span>
        <KakaoLogin />
        <GoogleLogin />
        <NaverLogin />
      </div>
    </div>
  );
};

export default Login;
