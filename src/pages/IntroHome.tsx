import React from "react";
import LoginModal from "../Components/IntroHome/LoginModal";
import IntroSlider from "../Components/IntroHome/Slider";

const IntroHome = () => {
  return (
    <React.Fragment>
      <div className="w-full flex flex-col items-center">
        <div className="w-[1180px] h-[540px] sm:w-full sm:mt-10">
          <IntroSlider />
        </div>
        <div className="mt-12 flex justify-center items-center bg-gray-400 rounded-lg">
          <LoginModal />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IntroHome;
