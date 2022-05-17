import React from "react";
import { Link, useLocation } from "react-router-dom";
import FramerHeader from "../Components/Header/FramerHeader";

const Header = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname.includes("tool") ? (
        <FramerHeader />
      ) : location.pathname.includes("projectList") || location.pathname.includes("profile") ? (
        <div className="w-full h-10 bg-4 flex justify-between items-center">
          <Link to="/">로고</Link>
          <nav className="w-72 flex justify-around">
            <Link to="/profile">프로필</Link>
          </nav>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default Header;
