import React from "react";
import { Link, useLocation } from "react-router-dom";
import FramerHeader from "../Components/Header/FramerHeader";
import { SvgUser } from "../elements/Icon/SvgUser";
import Logo from "../images/LOGO_2.png";

const Header = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <FramerHeader />
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <nav className="w-full h-12 flex justify-between items-center fixed z-50 shadow-md  dark:bg-gray-800">
          <Link to="/">
            <img className="ml-5 w-10 h-10 mt-[1px]" src={Logo} alt="Logo"></img>
          </Link>
          <nav className="w-72 flex justify-around">
            <Link to="/profile">
              <SvgUser />
            </Link>
          </nav>
        </nav>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
