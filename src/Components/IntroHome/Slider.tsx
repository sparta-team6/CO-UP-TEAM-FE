import Slider from "react-slick";
import slider1 from "../../images/Group_26.png";

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
      <img width={1180} height={540} src={slider1} alt="1" />
      <img width={1180} height={540} src={slider1} alt="2" />
      <img width={1180} height={540} src={slider1} alt="3" />
      <img width={1180} height={540} src={slider1} alt="4" />
    </Slider>
  );
};

export default IntroSlider;
