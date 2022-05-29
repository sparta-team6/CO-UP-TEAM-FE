import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Components/IntroHome/LoginModal";
import IntroSlider from "../Components/IntroHome/Slider";
import { getAccessTokenFromCookie, getFreshTokenFromCookie } from "../servers/Cookie";
const IntroHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = getAccessTokenFromCookie();
    const refreshToken = getFreshTokenFromCookie();
    if ((accessToken !== undefined && refreshToken !== undefined) === true) {
      navigate("/projectList");
    } else {
      navigate("/");
    }
  }, [navigate]);
  return (
    <React.Fragment>
      <div className="w-full h-screen bg-[#F0F3F7] dark:bg-7 flex flex-col items-center">
        <div className="w-[1244px] sm:w-full mb-9 flex justify-end items-center rounded-sm">
          <LoginModal />
        </div>
        <div className="w-[1244px] h-[604px] sm:w-full sm:mt-10">
          <IntroSlider />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IntroHome;
