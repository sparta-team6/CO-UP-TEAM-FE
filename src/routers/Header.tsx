import React from "react";
import { Link, useLocation } from "react-router-dom";
import FramerHeader from "../Components/Header/FramerHeader";
import { SvgUser } from "../elements/Icon/SvgUser";
import HeaderLogo from "../images/Header/HeaderLogo.png";

const Header = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <FramerHeader />
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <nav className="w-full h-16 flex justify-between items-center fixed z-50 shadow-md  dark:bg-gray-800">
          <Link to="/">
            <img className="mt-[3px]" src={HeaderLogo} alt="Logo" />
          </Link>
          <div className="w-14 flex justify-around">
            <Link to="/profile">
              <SvgUser />
            </Link>
          </div>
        </nav>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
