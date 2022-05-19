import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import Logo from "../../images/LOGO_2.png";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import { SvgUser } from "../../elements/Icon/SvgUser";
import { ProjectKey } from "../../recoil/RoomID";

const FramerHeader = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const mainMatch = useMatch("/tool/:id");
  const docMatch = useMatch("/tool/:id/document");
  const boardMatch = useMatch("/tool/:id/board");
  return (
    <React.Fragment>
      <nav className="sm:hidden w-full h-12 flex justify-between items-center fixed z-50 shadow-md bg-white dark:bg-gray-800">
        <div className="w-[25rem]">
          <Link to="/">
            <img className="ml-5 w-10 h-10 mt-[1px]" src={Logo} alt="Logo"></img>
          </Link>
        </div>
        <div className="w-[calc(100%-37rem)] min-w-max flex  space-x-20 text-base pl-5 sm:hidden">
          <div className="relative">
            <Link to={`/tool/${pjId}`}>
              <span className="dark:text-white">메인</span>
            </Link>
            {mainMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl sm:hidden"
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
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl sm:hidden"
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
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
        </div>
        <nav className="w-56 h-full flex justify-around items-center sm:hidden">
          <Link to={`/tool/${pjId}/chat`} className="hidden md:block">
            <span className="dark:text-white">채팅</span>
          </Link>
          <Link to="/profile" className="md:hidden">
            <span className="dark:text-white">
              <SvgUser />
            </span>
          </Link>
        </nav>
      </nav>
    </React.Fragment>
  );
};

export default FramerHeader;
