import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KakaoLogin from "../../elements/IntroHome/KakaoLogin";
import GoogleLogin from "../../elements/IntroHome/GoogleLogin";
import NaverLogin from "../../elements/IntroHome/NaverLogin";

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

  return (
    <div>
      <button className="w-40 p-3 font-extrabold" onClick={handleOpen}>
        CO-UP 시작하기
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[500px] h-[370px] rounded-xl">
          <div className="flex flex-col items-center space-y-4">
            <span className="font-bold text-xl p-8">
              로그인을 해주세요:&#41;
            </span>
            <KakaoLogin />
            <GoogleLogin />
            <NaverLogin />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
