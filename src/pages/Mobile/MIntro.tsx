import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MIntro1 from "../../images/Intro/Mobile/mintro1.png";
import MDIntro1 from "../../images/Intro/Mobile/mdintro1.png";
import MIntro2 from "../../images/Intro/Mobile/mintro2.png";
import MIntro3 from "../../images/Intro/Mobile/mintro3.png";
import MIntro4 from "../../images/Intro/Mobile/mintro4.png";
import MIntro5 from "../../images/Intro/Mobile/mintro5.png";
import MIntro6 from "../../images/Intro/Mobile/mintro6.png";
import { useRecoilValue } from "recoil";
import { themeState } from "../../recoil/DarkMode";

// 모바일 소개페이지
const MIntro = () => {
  const Dark = useRecoilValue(themeState);
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className=" h-full fixed flex top-[88%] justify-center items-start">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className=" w-[192px] h-[48px] rounded-md font-extrabold justify-center items-center flex bg-3 text-white"
          onClick={onClick}
        >
          CO-UP 시작하기
        </motion.div>
      </div>
      <div className="w-[360px] min-h-full flex flex-col justify-center">
        {Dark ? (
          <img width={360} height={282} src={MDIntro1} alt="111" />
        ) : (
          <img width={360} height={282} src={MIntro1} alt="112" />
        )}
        <img width={360} height={291} src={MIntro2} alt="113" />
        <img width={360} height={718} src={MIntro3} alt="114" />
        <img width={360} height={671} src={MIntro4} alt="115" />
        <img width={360} height={432} src={MIntro5} alt="116" />
        <img width={360} height={563} src={MIntro6} alt="117" />
      </div>
    </>
  );
};

export default MIntro;
