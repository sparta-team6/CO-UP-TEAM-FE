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
      <div className="w-full h-screen bg-[#F0F3F7] dark:bg-7 flex flex-col items-center">
        <div className="w-[1192px] sm:w-full mb-9 flex justify-end items-center rounded-sm">
          <LoginModal />
        </div>
        <div className="w-[1192px] h-[552px] rounded-xl bg-white sm:w-full sm:mt-10 p-1">
          <IntroSlider />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IntroHome;
