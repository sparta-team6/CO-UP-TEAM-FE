import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "../Components/Header/ProfileMenu";
import Footer from "./Footer";

const Header = () => {
  /* 프로젝트 정보는 리코일에 */
  const location = useLocation();
  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <React.Fragment>
          <div className="w-full h-12 bg-yellow-200 flex justify-between items-center fixed z-50 shadow-md sm:bottom-0 sm:h-20">
            <Footer />
            <div className="w-[21rem] sm:hidden">
              <Link to="/">로고</Link>
            </div>
            <nav className="w-[calc(100%-37rem)] flex  space-x-20 text-base pl-5 sm:w-full">
              <div className="relative">
                <Link to="/tool/1">메인</Link>
              </div>
              <div className="relative sm:hidden">
                <Link to="/tool/1/document">문서</Link>
              </div>
              <div className="hidden relative sm:block">
                <Link to="/tool/1/document/m">문서</Link>
              </div>
              <div className="relative">
                <Link to="/tool/1/board">보드</Link>
              </div>
            </nav>
            <nav className="w-64 h-full flex justify-around items-center">
              <ProfileMenu />
              <Link to="/projectList" className="sm:hidden">
                나가기
              </Link>
            </nav>
          </div>
        </React.Fragment>
      ) : location.pathname.includes("projectList") ? (
        <div className="w-full h-10 bg-yellow-200 flex justify-between items-center">
          <Link to="/">로고</Link>
          <nav className="w-72 flex justify-around">
            {/* 로그인 여부 확인해서 내 정보 나오게 */}
            <ProfileMenu />
          </nav>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
