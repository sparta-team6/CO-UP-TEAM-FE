import { KAKAO_AUTH_URL } from "../../servers/OAuth";
import kakao from "../../images/Login/KakaoLogin.png";

const KakaoLogin = () => {
  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div onClick={onClick} className="relative">
      <button className="w-[314px] h-[54px] text-black bg-[#F8E326] mt-[40px] rounded-lg">
        카카오 로그인
      </button>
      <img width={28} height={28} src={kakao} alt="" className="top-[54px] left-[46px] absolute" />
    </div>
  );
};

export default KakaoLogin;
