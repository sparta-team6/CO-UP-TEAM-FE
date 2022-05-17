import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import ProjectOpenForm from "../../elements/ProjectList/ProjectOpenForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 448,
  bgcolor: "background.paper",
  boxShadow: 4,
};

export default function ProjectOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="px-[22px] py-[12px] text-white bg-3 rounded-[4px]" onClick={handleOpen}>
        초대 코드
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="h-[262px] rounded-xl" sx={style}>
          <ProjectOpenForm />
        </Box>
      </Modal>
    </div>
  );
}
