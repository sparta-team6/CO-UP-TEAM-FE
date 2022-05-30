import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useExitRoom } from "../../api/ProjectQuery";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { SweetAlertHook } from "../../servers/Sweet";

interface IProps {
  roomID?: string;
}

const ProjectExit = ({ roomID }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mutateAsync } = useExitRoom(String(roomID));
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ExitProject = () => {
    setAnchorEl(null);
    Swal.fire({
      title: "프로젝트를 탈퇴하시겠습니까?",
      text: "탈퇴한 프로젝트는 복구되지 않습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        mutateAsync().then(() => {
          queryClient.invalidateQueries("getProject");
          SweetAlertHook(1000, "error", "프로젝트 탈퇴 완료😊");
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
            height: "32px",
            textAlign: "center",
            backgroundColor: "#E7EBF2",
            display: "flex",
            alignItems: "center",
            padding: 0,
          },
        }}
      >
        <button className="py-[7px] hover:text-[#2C78FF]" onClick={ExitProject}>
          탈퇴하기
        </button>
      </Menu>
    </>
  );
};

export default ProjectExit;
