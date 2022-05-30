import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import ProjectOpenForm from "../../elements/ProjectList/ProjectOpenForm";

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

  return (
    <div>
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
