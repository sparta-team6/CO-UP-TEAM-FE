import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FramerHeader from "../Components/Header/FramerHeader";
import { SvgUser } from "../elements/Icon/SvgUser";
import { HelpCircle } from "../elements/Icon/HelpCircle";
import HeaderLogo from "../images/Header/HeaderLogo.png";
import JoyrideContainer from "../Components/Tutorial/JoyrideContainer";
import { projectListSteps } from "../Components/Tutorial/Steps";

const Header = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <JoyrideContainer run={open} steps={projectListSteps} />
      {location.pathname.includes("tool") ? (
        <FramerHeader />
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <nav className="w-full h-16 flex justify-between items-center fixed z-50 shadow-md  dark:bg-gray-800 px-[23px]">
          <Link to="/">
            <img className="mt-[3px]" src={HeaderLogo} alt="Logo" />
          </Link>
          <div className="flex justify-between space-x-4">
            <div onClick={onClick}>
              <HelpCircle />
            </div>
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
