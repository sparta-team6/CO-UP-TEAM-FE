import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../recoil/Atoms";
import Footer from "./Footer";

const Header = () => {
  const location = useLocation();
  const project = useRecoilValue(ProjectKey);
  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <React.Fragment>
          <div className="w-full h-12 bg-4 flex justify-between items-center fixed z-50 shadow-md md:bottom-0 sm:h-20">
            <Footer />
            <div className="w-[21rem] md:hidden">
              <Link to="/">로고</Link>
            </div>
            <nav className="w-[calc(100%-37rem)] flex  space-x-20 text-base pl-5 sm:w-full">
              <div className="relative">
                <Link to={`/tool/${project.pjId}`}>메인</Link>
              </div>
              <div className="relative">
                <Link to={`/tool/${project.pjId}/document`}>문서</Link>
              </div>
              <div className="relative">
                <Link to={`/tool/${project.pjId}/board`}>보드</Link>
              </div>
            </nav>
            <nav className="w-64 h-full flex justify-around items-center">
              <Link to={`/tool/${project.pjId}/chat`} className="hidden md:block">
                채팅
              </Link>
              <Link to="/profile" className="md:hidden">
                프로필
              </Link>
              <Link to="/projectList" className="md:hidden">
                나가기
              </Link>
            </nav>
          </div>
        </React.Fragment>
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <div className="w-full h-10 bg-4 flex justify-between items-center">
          <Link to="/">로고</Link>
          <nav className="w-72 flex justify-around">
            <Link to="/profile">프로필</Link>
          </nav>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
