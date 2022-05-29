import Slider from "react-slick";
import slider1 from "../../images/Intro/intro1.png";
import slider2 from "../../images/Intro/intro2.png";
import slider3 from "../../images/Intro/intro3.png";
import slider4 from "../../images/Intro/intro4.png";
import slider5 from "../../images/Intro/intro5.png";
import slider6 from "../../images/Intro/intro6.png";

const IntroSlider = () => {
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
    <Slider {...settings}>
      <img width={1184} height={544} src={slider1} alt="1" />
      <img width={1184} height={544} src={slider2} alt="2" />
      <img width={1184} height={544} src={slider3} alt="3" />
      <img width={1184} height={544} src={slider4} alt="4" />
      <img width={1184} height={544} src={slider5} alt="5" />
      <img width={1184} height={544} src={slider6} alt="6" />
    </Slider>
  );
};

export default IntroSlider;
