import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import ProjectOpenForm from "../../elements/ProjectList/ProjectOpenForm";
import { usePostOpenRoom } from "../../api/ProjectQuery";
import { queryClient } from "../..";
import { SweetAlertHook } from "../../servers/Sweet";

import logo from "../../images/ProjectList/teamcook.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 4,
};

export default function ProjectOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutateAsync } = usePostOpenRoom();
  const onClick = () => {
    mutateAsync("f01619bd-6917-4491-b7af-cb43cb8cb883")
      .then(() => {
        queryClient.invalidateQueries("getProject");
        setOpen(false);
        SweetAlertHook(2000, "success", "CO-UP 공식 프로젝트 참여 완료😊");
      })
      .catch((err) => {
        setOpen(false);
        SweetAlertHook(2000, "error", "공식 프로젝트 참여 혹은 탈퇴한 프로젝트입니다 문의주세요😥");
      });
  };
  return (
    <div className="flex items-center space-x-2">
      <img
        src={logo}
        alt=""
        className="w-9 h-9 rounded-full text-white hover:bg-h1 bg-3 lg:mr-4 animate-bounce cursor-pointer"
        onClick={onClick}
      ></img>
      <button
        className="tutorial-pl2 px-[22px] py-[12px] text-white hover:bg-h1 bg-3 rounded-[4px] md:mr-[12px] sm:mr-0"
        onClick={handleOpen}
      >
        초대코드
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="h-[262px] sm:w-[320px] w-[448px] rounded-xl" sx={style}>
          <ProjectOpenForm setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}
