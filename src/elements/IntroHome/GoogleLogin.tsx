import { Link } from "react-router-dom";

const GoogleLogin = () => {
  return (
    <Link to="/projectList">
      {/* <img src={GoogleImg} alt="구글계정 로그인" /> */}
      <button className="w-56 p-2 bg-slate-300 rounded-lg">구글 로그인</button>
    </Link>
  );
};

export default GoogleLogin;
