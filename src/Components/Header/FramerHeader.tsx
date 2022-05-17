import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import Logo from "../../images/LOGO_2.png";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import Footer from "../../routers/Footer";
import { ProjectKey } from "../../recoil/Atoms";

const FramerHeader = () => {
  const project = useRecoilValue(ProjectKey);
  const mainMatch = useMatch("/tool/:id");
  const docMatch = useMatch("/tool/:id/document");
  const boardMatch = useMatch("/tool/:id/board");
  return (
    <React.Fragment>
      <div className="w-full h-12 flex justify-between items-center fixed z-50 shadow-md sm:bottom-0 sm:h-20  dark:bg-gray-800">
        <Footer />
        <div className="w-[25rem] md:hidden">
          <Link to="/">
            <img className="ml-5 w-10 h-10 mt-[1px]" src={Logo} alt="Logo"></img>
          </Link>
        </div>
        <nav className="w-[calc(100%-37rem)] min-w-max flex  space-x-20 text-base pl-5 sm:w-full">
          <div className="relative">
            <Link to={`/tool/${project.pjId}`}>
              <span className="dark:text-white">메인</span>
            </Link>
            {mainMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${project.pjId}/document`}>
              <span className="dark:text-white">문서</span>
            </Link>
            {docMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${project.pjId}/board`}>
              <span className="dark:text-white">보드</span>
            </Link>
            {boardMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl"
                layoutId="circle"
              />
            )}
          </div>
        </nav>
        <nav className="w-56 h-full flex justify-around items-center">
          <Link to={`/tool/${project.pjId}/chat`} className="hidden md:block">
            <span className="dark:text-white">채팅</span>
          </Link>
          <Link to="/profile" className="md:hidden">
            <span className="dark:text-white">프로필</span>
          </Link>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default FramerHeader;
