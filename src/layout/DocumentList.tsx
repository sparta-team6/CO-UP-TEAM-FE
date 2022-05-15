import { useNavigate, useParams } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../recoil/Atoms";
import { useAddFolder, useGetFolders } from "../api/FolderQuery";
import { queryClient } from "..";

const ITEM_HEIGHT = 48;

const DocumentList = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data } = useGetFolders(pjId);
  const { mutateAsync } = useAddFolder();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    const folder = {
      pjId: String(pjId),
      title: "폴더 1",
      position: 1,
    };
    mutateAsync(folder)
      .then(() => {
        console.log(folder);
        queryClient.invalidateQueries("getFolders");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-72 h-full bg-orange-300 sm:w-full">
      <div className="flex justify-between items-center pt-5 px-4 sm:pt-4">
        <div className="font-bold text-xl">문서목록</div>
        <nav className="w-8 font-bold text-2xl flex justify-center items-center">
          <div onClick={onClick}>+</div>
        </nav>
      </div>
      <hr />
      {data?.data?.map((folder) => (
        <>
          <div className="flex justify-between items-center px-4" key={folder.dfId}>
            <div className="font-bold text-lg">{folder.title}</div>
            <div className="group relative">
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
                <MenuItem onClick={() => navigate(`/tool/${id}/document/add`)}>
                  문서 생성하기
                </MenuItem>
                <MenuItem>폴더 이름 바꾸기</MenuItem>
                <MenuItem>폴더 지우기</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="flex flex-col ml-10 mt-2">
            <div className="flex items-center">
              <div className="text-base m-1 cursor-pointer">
                {/* <Link
                  to={`/tool/1/document/${doc.id}`}
                  state={{
                    id: doc.id,
                    title: doc.title,
                    contents: doc.contents,
                    docId: doc.docId,
                  }}
                >
                  {doc.title}
                </Link> */}
              </div>
            </div>
          </div>
        </>
      ))}
      <hr />
    </div>
  );
};

export default React.memo(DocumentList);
