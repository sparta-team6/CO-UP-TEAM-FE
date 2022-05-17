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
      <div className="w-full h-12 flex justify-between items-center fixed z-50 shadow-md sm:bottom-0 sm:h-20">
        <Footer />
        <div className="w-[21rem] md:hidden">
          <Link to="/">
            <img className="ml-4 w-10 h-10" src={Logo} alt="Logo"></img>
          </Link>
        </div>
        <nav className="w-[calc(100%-37rem)] flex  space-x-20 text-base pl-5 sm:w-full">
          <div className="relative">
            <Link to={`/tool/${project.pjId}`}>메인</Link>
            {mainMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${project.pjId}/document`}>문서</Link>
            {docMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${project.pjId}/board`}>보드</Link>
            {boardMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-14 h-1 absolute top-8 -right-[14px] bg-3 rounded-t-2xl"
                layoutId="circle"
              />
            )}
          </div>
        </nav>
        <nav className="w-64 h-full flex justify-around items-center">
          <Link to={`/tool/${project.pjId}/chat`} className="hidden md:block">
            채팅
          </Link>
          <Link to="/profile" className="md:hidden">
            프로필
          </Link>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default FramerHeader;
