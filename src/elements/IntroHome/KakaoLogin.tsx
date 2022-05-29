import { KAKAO_AUTH_URL } from "../../servers/OAuth";
// import kakao from "../../images/Login/kakaolink_btn_small_ov.png";

const KakaoLogin = () => {
  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div onClick={onClick} className="relative">
      <button className="w-[314px] h-[54px] text-black bg-[#FEE500] mt-[40px] rounded-lg">
        카카오 로그인
      </button>
      {/* <img src={kakao} alt="" className="w-10 h-10 top-[50%] left-8 absolute"></img> */}
    </div>
  );
};

export default KakaoLogin;
