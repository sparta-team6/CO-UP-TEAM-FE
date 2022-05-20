import { NAVER_AUTH_URL } from "../../servers/OAuth";

const NaverLogin = () => {
  const onClick = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <div onClick={onClick}>
      <button className="w-[314px] h-[54px] text-white bg-[#24C934] mt-[24px] rounded-lg">
        네이버 로그인
      </button>
    </div>
  );
};

export default NaverLogin;
