import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FramerHeader from "../Components/Header/FramerHeader";
import { SvgUser } from "../elements/Icon/SvgUser";
import { HelpCircle } from "../elements/Icon/HelpCircle";
import HeaderLogo from "../images/Header/HeaderLogo.png";
import JoyrideContainer from "../Components/Tutorial/JoyrideContainer";
import { projectListSteps } from "../Components/Tutorial/Steps";
import { themeState } from "../recoil/DarkMode";
import { useRecoilState } from "recoil";
import { Moon } from "../elements/Icon/Moon";
import { Sun } from "../elements/Icon/Sun";

const Header = () => {
  const location = useLocation();
  const [theme, DarkMode] = useRecoilState(themeState);
  const onDarkMode = () => {
    DarkMode((prev: boolean) => !prev);
  };
  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <FramerHeader />
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <nav className="w-full h-16 flex justify-between items-center fixed z-50 shadow-md  dark:bg-gray-800 px-[22px]">
          <Link to="/" className="mr-[4px]">
            <img width={51} height={54} className="mt-[3px]" src={HeaderLogo} alt="Logo" />
          </Link>
          <div className="flex justify-between space-x-4">
            <div className="tutorial-pl3 cursor-pointer" onClick={onDarkMode}>
              {theme ? <Moon /> : <Sun />}
            </div>
            <div className="tutorial-pl4">
              <Link to="/profile">
                <SvgUser />
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
