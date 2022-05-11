import { KAKAO_AUTH_URL } from "../../servers/OAuth";

const KakaoLogin = () => {
  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div onClick={onClick}>
      {/* <img src={KakaoImg} alt="카카오계정 로그인" /> */}
      <button className="w-56 p-2 bg-yellow-300 rounded-lg">
        카카오 로그인
      </button>
    </div>
  );
};

export default KakaoLogin;
