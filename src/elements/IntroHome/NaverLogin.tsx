import { NAVER_AUTH_URL } from "../../servers/OAuth";
// import naver from "../../images/Login/Logo_naver_d.png"

const NaverLogin = () => {
  const onClick = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <div onClick={onClick} className="relative">
      <button className="w-[314px] h-[54px] text-white bg-[#24C934] mt-[24px] rounded-lg">
        네이버 로그인
      </button>
      {/* <img src={naver} alt="" className="w-10 h-10 top-[40%] left-8 absolute"></img> */}
    </div>
  );
};

export default NaverLogin;
