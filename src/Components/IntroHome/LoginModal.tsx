import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KakaoLogin from "../../elements/IntroHome/KakaoLogin";
import GoogleLogin from "../../elements/IntroHome/GoogleLogin";
import NaverLogin from "../../elements/IntroHome/NaverLogin";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
        className="w-44 rounded-md p-3 font-extrabold sm:hidden bg-3 text-white"
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
        <Box sx={style} className="w-[500px] h-[370px] rounded-xl">
          <div className="flex flex-col items-center space-y-4">
            <span className="font-bold text-xl p-8">{`로그인을 해주세요:)`}</span>
            <KakaoLogin />
            <GoogleLogin />
            <NaverLogin />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
