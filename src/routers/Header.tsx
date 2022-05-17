import React from "react";
import { Link, useLocation } from "react-router-dom";
import FramerHeader from "../Components/Header/FramerHeader";
import Logo from "../images/LOGO_2.png";

const Header = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <FramerHeader />
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <div className="w-full h-12 flex justify-between items-center shadow-md sm:bottom-0 sm:h-20 dark:bg-gray-800">
          <Link to="/">
            <img className="ml-4 w-10 h-10" src={Logo} alt="Logo"></img>
          </Link>
          <nav className="w-72 flex justify-around">
            <Link to="/profile">프로필</Link>
          </nav>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
