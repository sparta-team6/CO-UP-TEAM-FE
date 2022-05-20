import { KAKAO_AUTH_URL } from "../../servers/OAuth";

const KakaoLogin = () => {
  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div onClick={onClick}>
      <button className="w-[314px] h-[54px] text-white bg-[#FFD33C] mt-[40px] rounded-lg">
        카카오 로그인
      </button>
    </div>
  );
};

export default KakaoLogin;
