import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>CO-UP</title>
      </Helmet>
      <div className="w-full h-screen sm:h-auto cu:bg-[url('../images/Intro/IntroBg.png')] cu:dark:bg-[url('../images/Intro/Dark/IntroBgDark.png')] sm:bg-[#ffffff]  dark:bg-8 flex flex-col items-center">
        <div className="w-[1192px] sm:w-full mb-9 flex justify-end sm:justify-center sm:min-h-screen rounded-sm">
          <LoginModal />
        </div>
        <div className="sm:hidden w-[1192px] h-[552px] rounded-xl bg-[#ffffff] dark:bg-8 sm:w-full sm:mt-10 p-1">
          <IntroSlider />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IntroHome;
