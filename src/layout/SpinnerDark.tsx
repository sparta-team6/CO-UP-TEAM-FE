import React from "react";
import { HelpCircle } from "../elements/Icon/HelpCircle";
import { SvgUser } from "../elements/Icon/SvgUser";
import HeaderLogo from "../images/Header/HeaderLogo.png";

const SpinnerDark = () => {
  return (
    <React.Fragment>
      <div className="w-full h-screen bg-7 fixed top-0">
        <nav className="w-full h-16 flex justify-between items-center fixed bg-7 z-50 shadow-md px-[23px]">
          <div className="flex justify-between space-x-4">
            <div>
              <HelpCircle />
            </div>
            <SvgUser />
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SpinnerDark;
