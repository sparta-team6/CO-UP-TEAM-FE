import React from "react";
import LoginModal from "../Components/IntroHome/LoginModal";
import IntroSlider from "../Components/IntroHome/Slider";

const IntroHome = () => {
  return (
    <React.Fragment>
      <div className="w-full h-screen bg-[#F0F3F7] flex flex-col items-center">
        <div className="w-[1180px] h-[540px] pt-28 sm:w-full sm:mt-10">
          <IntroSlider />
          <div className="mt-12 flex justify-center items-center rounded-lg">
            <LoginModal />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default IntroHome;
