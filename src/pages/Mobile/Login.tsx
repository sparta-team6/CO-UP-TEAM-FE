import { Link } from "react-router-dom";
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
        <Link
          className="w-[314px] h-[54px] text-white bg-black mt-9 rounded-lg flex justify-center items-center"
          to="/projectList"
        >
          <span>프론트 테스트 접속</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
