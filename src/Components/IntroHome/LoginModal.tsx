import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KakaoLogin from "../../elements/IntroHome/KakaoLogin";
import GoogleLogin from "../../elements/IntroHome/GoogleLogin";
import NaverLogin from "../../elements/IntroHome/NaverLogin";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MIntro from "../../pages/Mobile/MIntro";

/* h-[480px] 입니다 */
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 704,
  height: 384,
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className="hidden max-w-[768px] min-h-full sm:flex justify-center">
        <MIntro />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-[194px] h-[60px] rounded-xl text-[20px] flex justify-center items-center mt-[70px] font-extrabold sm:hidden bg-3 text-white"
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
          <div className="flex flex-col items-center relative">
            <div className="font-bold text-2xl pt-[25px]">
              <span>{`로그인을 해주세요:)`}</span>
            </div>
            <KakaoLogin />
            <GoogleLogin />
            <NaverLogin />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
