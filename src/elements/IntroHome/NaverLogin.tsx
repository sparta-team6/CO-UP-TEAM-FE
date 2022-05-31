import { NAVER_AUTH_URL } from "../../servers/OAuth";
import Naver from "../../images/Login/NaverLogin.png";

const NaverLogin = () => {
  const onClick = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <div onClick={onClick} className="relative">
      {/* <button className="w-[314px] h-[54px] text-white bg-[#00CA40] mt-[24px] rounded-lg">
        네이버 로그인
      </button>
      <img
        width={40}
        height={40}
        src={Naver}
        alt=""
        className="top-[40%] left-[40px] absolute"
      ></img> */}
    </div>
  );
};

export default NaverLogin;
