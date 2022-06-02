import React from "react";
import { HelpCircle } from "../elements/Icon/HelpCircle";
import { SvgUser } from "../elements/Icon/SvgUser";

const SpinnerLigth = () => {
  return (
    <React.Fragment>
      <nav className="w-full h-16 flex justify-between items-center fixed z-50 shadow-md px-[23px]">
        <div className="flex justify-between space-x-4">
          <div>
            <HelpCircle />
          </div>
          <SvgUser />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default SpinnerLigth;
