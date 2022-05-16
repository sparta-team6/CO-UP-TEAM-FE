import { useState } from "react";
import { queryClient } from "../..";
import { useDelRoom } from "../../api/ProjectQuery";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ProjectUpdateForm from "./ProjectUpdateForm";

const ITEM_HEIGHT = 48;

type IProps = {
  roomID?: string;
  roomImg: string;
  roomTitle: string;
  roomSummary: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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
    mutateAsync().then(() => {
      alert("방 삭제했어");
      queryClient.invalidateQueries("getProject");
      setAnchorEl(null);
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
      >
        <MoreVertIcon />
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "10ch",
          },
        }}
      >
        <MenuItem onClick={handleUpOpen}>수정</MenuItem>
        <MenuItem onClick={delProject}>삭제</MenuItem>
      </Menu>
      <Modal
        open={upOpen}
        onClose={handleUpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
