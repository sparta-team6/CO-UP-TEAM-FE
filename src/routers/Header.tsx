import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import ProfileMenu from "../Components/Header/ProfileMenu";

const Header = () => {
  /* 프로젝트 정보는 리코일에 */
  const location = useLocation();
  const MainMatch = useMatch("/tool/:id");
  const DocumentMatch = useMatch("/tool/:id/document");
  const BoardMatch = useMatch("/tool/:id/board");
  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <React.Fragment>
          <div className="w-full h-12 bg-yellow-200 flex justify-between items-center fixed z-50 shadow-md">
            <div className="w-[21rem]">
              <Link to="/">로고</Link>
            </div>
            <nav className="w-[calc(100%-37rem)] flex  space-x-20 text-base pl-5">
              <div className="relative">
                <Link to="/tool/1">메인</Link>
                {MainMatch && (
                  <div className="w-[50px] h-1 absolute top-8 -right-2 bg-violet-500 rounded-t-2xl" />
                )}
              </div>
              <div className="relative">
                <Link to="/tool/1/document">문서</Link>
                {DocumentMatch && (
                  <div className="w-[50px] h-1 absolute top-8 -right-2 bg-violet-500 rounded-t-2xl" />
                )}
              </div>
              <div className="relative">
                <Link to="/tool/1/board">보드</Link>
                {BoardMatch && (
                  <div className="w-[50px] h-1 absolute top-8 -right-2 bg-violet-500 rounded-t-2xl" />
                )}
              </div>
            </nav>
            <nav className="w-64 h-full flex justify-around items-center">
              <ProfileMenu />
              <Link to="/projectList">나가기</Link>
            </nav>
          </div>
        </React.Fragment>
      ) : (
        <div className="w-full h-10 bg-yellow-200 flex justify-between items-center">
          <Link to="/">로고</Link>
          <nav className="w-72 flex justify-around">
            {/* 로그인 여부 확인해서 내 정보 나오게 */}
            <ProfileMenu />
          </nav>
        </div>
      )}
    </React.Fragment>
  );
};
export default Header;
