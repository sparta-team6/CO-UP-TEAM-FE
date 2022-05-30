import React from "react";
import Slider from "react-slick";
import { useRecoilValue } from "recoil";
import slider1 from "../../images/Intro/intro1.png";
import slider2 from "../../images/Intro/intro2.png";
import slider3 from "../../images/Intro/intro3.png";
import slider4 from "../../images/Intro/intro4.png";
import slider5 from "../../images/Intro/intro5.png";
import slider6 from "../../images/Intro/intro6.png";

import Dslider1 from "../../images/Intro/Dark/Dintro1.png";
import Dslider2 from "../../images/Intro/Dark/Dintro2.png";
import Dslider3 from "../../images/Intro/Dark/Dintro3.png";
import Dslider4 from "../../images/Intro/Dark/Dintro4.png";
import Dslider5 from "../../images/Intro/Dark/Dintro5.png";
import Dslider6 from "../../images/Intro/Dark/Dintro6.png";
import { themeState } from "../../recoil/DarkMode";

const IntroSlider = () => {
  const Dark = useRecoilValue(themeState);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <React.Fragment>
      {Dark ? (
        <Slider {...settings}>
          <img width={1184} height={544} src={Dslider1} alt="1" />
          <img width={1184} height={544} src={Dslider2} alt="2" />
          <img width={1184} height={544} src={Dslider3} alt="3" />
          <img width={1184} height={544} src={Dslider4} alt="4" />
          <img width={1184} height={544} src={Dslider5} alt="5" />
          <img width={1184} height={544} src={Dslider6} alt="6" />
        </Slider>
      ) : (
        <Slider {...settings}>
          <img width={1184} height={544} src={slider1} alt="1" />
          <img width={1184} height={544} src={slider2} alt="2" />
          <img width={1184} height={544} src={slider3} alt="3" />
          <img width={1184} height={544} src={slider4} alt="4" />
          <img width={1184} height={544} src={slider5} alt="5" />
          <img width={1184} height={544} src={slider6} alt="6" />
        </Slider>
      )}
    </React.Fragment>
  );
};

export default IntroSlider;
