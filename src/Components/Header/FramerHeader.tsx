import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import HeaderLogo from "../../images/Header/HeaderLogo.png";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import { SvgUser } from "../../elements/Icon/SvgUser";
import { ProjectKey } from "../../recoil/RoomID";

const FramerHeader = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const mainMatch = useMatch("/tool/:id");
  const docMatch = useMatch("/tool/:id/document/*");
  const boardMatch = useMatch("/tool/:id/board");
  return (
    <React.Fragment>
      <nav className="sm:hidden w-full h-16 flex justify-between items-center fixed z-[1000] shadow-md dark:bg-gray-800 px-[23px]">
        <Link to="/">
          <img className="mt-[3px]" src={HeaderLogo} alt="Logo" />
        </Link>
        <div className="w-[calc(100%-37rem)] min-w-max flex items-end h-10 space-x-20 text-base pl-28 sm:hidden">
          <div className="relative">
            <Link to={`/tool/${pjId}`}>
              <span className="dark:text-white">메인</span>
            </Link>
            {mainMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-20 h-1 absolute top-8 -right-[26px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${pjId}/document`}>
              <span className="dark:text-white">문서</span>
            </Link>
            {docMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-20 h-1 absolute top-8 -right-[26px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${pjId}/board`}>
              <span className="dark:text-white">보드</span>
            </Link>
            {boardMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-20 h-1 absolute top-8 -right-[26px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
        </div>
        <nav className="h-full flex justify-around items-center sm:hidden dark:bg-gray-800">
          <Link to={`/tool/${pjId}/chat`} className="hidden md:block">
            <span className="dark:text-white">채팅</span>
          </Link>
          <Link to="/profile" className="sm:hidden">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-3 opacity-70">
              <SvgUser />
            </div>
          </Link>
        </nav>
      </nav>
    </React.Fragment>
  );
};

export default FramerHeader;
