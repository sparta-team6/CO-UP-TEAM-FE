import { useState } from "react";
import { useRecoilValue } from "recoil";
import { User } from "../../api/UserQuery";
import imgCrown from "../../images/img_crown.png";
import { KickBtn } from "../../recoil/AtomKickBtn";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TeamInvite from "./TeamInvite";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 4,
};

// 해당 프로젝트 방장
const TeamAdmin = ({ profileImage, nickname, aboutMe, url }: User) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const kickBtn = useRecoilValue(KickBtn);
  return (
    <div className="group w-full mt-[20px] relative flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        <img className="absolute -top-1 left-6" src={imgCrown} alt="" />
        <img className="rounded-full m-0" width={36} height={36} src={profileImage} alt="" />
        <span className="font-semibold dark:text-white">{nickname}</span>
      </div>
      {kickBtn && (
        <button
          className="flex justify-center items-center text-2xl w-[24px] h-[24px] bg-3 rounded-full text-white"
          onClick={handleOpen}
        >
          +
        </button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="h-[262px] sm:w-[320px] w-[448px] rounded-xl" sx={style}>
          <TeamInvite setOpen={setOpen} />
        </Box>
      </Modal>
      <div className="left-[-13%] bottom-[36px] hidden w-[280px] sm:w-[275px] min-h-[120px] z-50 bg-5 dark:bg-8 border-[#E7EBF2] dark:border-[#666666] border-[1px] border-solid group-hover:flex sm:group-focus:block absolute right-[-315px] rounded-lg shadow-md">
        <div className="w-full h-full px-[22px] py-[12px] flex flex-col">
          <div className="w-full h-full flex">
            <div className="h-full flex items-center">
              <img className="rounded-full" width={36} height={36} src={profileImage} alt="" />
            </div>
            <div className="flex flex-col w-[210px] h-full pl-[12px] pt-[12px]">
              <span className="font-semibold ">{nickname}</span>
              <span className="whitespace-pre-wrap break-all pt-[12px] pb-[18px]">{aboutMe}</span>
              <a
                href={url}
                target="_blank"
                className="text-xs text-8 dark:text-2 text-ellipsis overflow-hidden whitespace-nowrap"
                rel="noreferrer"
              >
                {url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAdmin;
