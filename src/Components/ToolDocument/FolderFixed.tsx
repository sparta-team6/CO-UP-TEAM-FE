import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";
import { useDelFolder } from "../../api/FolderQuery";
import { queryClient } from "../..";

type IProps = {
  dfId?: string;
  setEditTitle: Dispatch<SetStateAction<boolean>>;
  setDfId: Dispatch<SetStateAction<string>>;
};

const ITEM_HEIGHT = 48;

const FolderFiexd = ({ dfId, setEditTitle, setDfId }: IProps) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync: DelFolder } = useDelFolder(String(dfId));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    navigate(`/tool/${pjId}/document/add`, { state: dfId });
  };

  const DeleteFolder = () => {
    DelFolder().then(() => {
      queryClient.invalidateQueries("getFolders");
    });
  };

  const onEdit = () => {
    setEditTitle(true);
    setAnchorEl(null);
    setDfId(String(dfId));
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "16ch",
          },
        }}
      >
        <MenuItem onClick={onClick}>문서 생성하기</MenuItem>
        <MenuItem onClick={onEdit}>폴더 이름 바꾸기</MenuItem>
        <MenuItem onClick={DeleteFolder}>폴더 지우기</MenuItem>
      </Menu>
    </>
  );
};

export default FolderFiexd;
