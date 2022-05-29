import { useState } from "react";
import { queryClient } from "../..";
import { useDelRoom } from "../../api/ProjectQuery";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ProjectUpdateForm from "./ProjectUpdateForm";
import Swal from "sweetalert2";

interface IProps {
  roomID?: string;
  roomImg: string;
  roomTitle: string;
  roomSummary: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 4,
};

const ProjectFixed = ({ roomID, roomImg, roomTitle, roomSummary }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [upOpen, setUpOpen] = useState(false);
  const handleUpOpen = () => {
    setUpOpen(true);
    setAnchorEl(null);
  };
  const handleUpClose = () => setUpOpen(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutateAsync } = useDelRoom(String(roomID));
  const delProject = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "삭제",
      text: "진짜 삭제하시겠어요?!!",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.value) {
        mutateAsync().then(() => {
          queryClient.invalidateQueries("getProject");
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: "프로젝트 삭제 완료😊",
          });
        });
      }
    });
  };
  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="p-3"
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "120px",
            height: "65px",
            textAlign: "center",
            backgroundColor: "#E7EBF2",
            display: "flex",
            alignItems: "center",
            padding: 0,
          },
        }}
      >
        <button className="py-[7px] hover:text-[#2C78FF]" onClick={handleUpOpen}>
          수정하기
        </button>
        <div className="border-t border-solid border-[#D7DCE5]"></div>
        <button className="py-[7px] mt-[1px] hover:text-[#2C78FF]" onClick={delProject}>
          삭제하기
        </button>
      </Menu>
      <Modal
        open={upOpen}
        onClose={handleUpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl w-[704px] h-[400px] sm:w-[320px] sm:h-[420px]">
          <ProjectUpdateForm
            setUpOpen={setUpOpen}
            roomID={roomID}
            roomImg={roomImg}
            roomTitle={roomTitle}
            roomSummary={roomSummary}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ProjectFixed;
