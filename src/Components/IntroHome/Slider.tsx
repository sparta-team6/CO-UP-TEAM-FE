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
      <img src={slider1} alt="1" />
    </Slider>
  );
};

export default IntroSlider;
