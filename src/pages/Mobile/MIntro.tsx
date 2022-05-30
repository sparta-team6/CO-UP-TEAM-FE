import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MIntro1 from "../../images/Intro/Mobile/mintro1.png";
import MIntro2 from "../../images/Intro/Mobile/mintro2.png";
import MIntro3 from "../../images/Intro/Mobile/mintro3.png";
import MIntro4 from "../../images/Intro/Mobile/mintro4.png";
import MIntro5 from "../../images/Intro/Mobile/mintro5.png";
import MIntro6 from "../../images/Intro/Mobile/mintro6.png";

const MIntro = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="w-full h-full fixed flex top-[80%] justify-center items-start">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className=" w-[192px] h-[48px] rounded-md font-extrabold justify-center items-center flex bg-3 text-white"
          onClick={onClick}
        >
          CO-UP 시작하기
        </motion.div>
      </div>
      <div className="w-full min-h-full flex flex-col justify-center">
        <img width={360} height={282} src={MIntro1} alt="1" />
        <img width={360} height={291} src={MIntro2} alt="2" />
        <img width={360} height={718} src={MIntro3} alt="3" />
        <img width={360} height={671} src={MIntro4} alt="4" />
        <img width={360} height={432} src={MIntro5} alt="5" />
        <img width={360} height={563} src={MIntro6} alt="6" />
      </div>
    </>
  );
};

export default MIntro;
