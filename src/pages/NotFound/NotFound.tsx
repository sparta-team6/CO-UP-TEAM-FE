import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import x from "../../images/Lazy/x.png";
import { motion } from "framer-motion";

// URL이 정상적인 경로가 아닐경우 나오는 페이지
const NotFound = () => {
  const navigation = useNavigate();
  return (
    <>
      <Helmet>
        <title>CO-UP | NotFound</title>
      </Helmet>
      <div className="w-full h-screen fixed z-[9999] bg-[#ffffff] dark:bg-7 flex justify-center items-center flex-col space-y-10">
        <img width={325} height={319} src={x} alt="" />
        <span className="text-3xl">잘못된 접근입니다!</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigation("/projectList")}
          className="w-[130px] h-[52px] rounded-md text-white text-xl bg-3"
        >
          돌아가기
        </motion.button>
      </div>
    </>
  );
};
export default NotFound;
