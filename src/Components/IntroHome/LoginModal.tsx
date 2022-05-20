import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KakaoLogin from "../../elements/IntroHome/KakaoLogin";
import GoogleLogin from "../../elements/IntroHome/GoogleLogin";
import NaverLogin from "../../elements/IntroHome/NaverLogin";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* h-[480px] 입니다 */
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 784,
  height: 520,
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="hidden w-44 rounded-md p-3 font-extrabold sm:block bg-3 text-white"
        onClick={onClick}
      >
        CO-UP 시작하기
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-[280px] h-[80px] rounded-xl text-[32px] mt-[70px] font-extrabold sm:hidden bg-3 text-white"
        onClick={handleOpen}
      >
        CO-UP 시작하기
      </motion.button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* h-[370px]입니다 */}
        <Box sx={style} className="rounded-xl">
          <div className="flex flex-col items-center">
            <span className="font-bold text-4xl p-8">{`로그인을 해주세요:)`}</span>
            <KakaoLogin />
            <GoogleLogin />
            <NaverLogin />
            <Link
              className="w-[314px] h-[54px] text-white bg-4 mt-9 rounded-lg flex justify-center items-center"
              to="/projectList"
            >
              <span>테스트 입장</span>
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
