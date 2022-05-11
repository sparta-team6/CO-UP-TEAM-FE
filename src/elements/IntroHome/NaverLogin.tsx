import { Link } from "react-router-dom";

const NaverLogin = () => {
  return (
    <Link to="/projectList">
      <button className="w-56 p-2 bg-green-600 text-white rounded-lg">
        네이버 로그인
      </button>
    </Link>
  );
};

export default NaverLogin;
