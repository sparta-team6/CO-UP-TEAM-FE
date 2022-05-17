import { Link } from "react-router-dom";

const NaverLogin = () => {
  return (
    <Link to="/projectList">
      <button className="w-[314px] h-[54px] text-white bg-[#24C934] mt-9 rounded-lg">
        네이버 로그인
      </button>
    </Link>
  );
};

export default NaverLogin;
