import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { useDelAnnouncement } from "../../api/AnnouncementQuery";
import { ProjectKey } from "../../recoil/RoomID";
import { SvgEdit3 } from "../Icon/SvgEdit3";
import { Trash } from "../Icon/Trash";
import EditAnnouncement from "./EditAnnouncement";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 704,
  height: 384,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

interface IAnnouncementProps {
  noticeId?: string;
  title?: string;
  contents?: string;
  modifiedTime?: string;
  index: number;
}

const DetailAnnouncement = ({ noticeId, title, contents, modifiedTime }: IAnnouncementProps) => {
  const { pjId, projectRole } = useRecoilValue(ProjectKey);
  const { mutateAsync: DELAN } = useDelAnnouncement();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleOpen = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };
  const EditOpen = (e: any) => {
    e.stopPropagation();
    setEdit(true);
  };
  const onDelete = (e: any) => {
    e.stopPropagation();
    const Delete = {
      data: {
        noticeId: String(noticeId),
        pjId,
      },
    };
    Swal.fire({
      title: "삭제",
      text: "진짜 삭제하시겠어요?!!",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.value) {
        DELAN(Delete).then(() => {
          queryClient.invalidateQueries("getAnnouncement");
        });
      }
    });
  };
  return (
    <Scroll className="w-full h-full space-y-2 mb-[8px] pl-[20px] pr-[5px] flex flex-col items-center">
      <div
        onClick={handleOpen}
        className="w-full max-w-[548px] min-h-[68px] bg-white border rounded-lg overflow-hidden flex"
      >
        <div className="w-2 h-full bg-3" />
        <div className="w-full h-full ml-[14px] mr-2 flex flex-col">
          <div className="flex relative">
            <div className="w-full text-[13px] font-semibold pt-3">
              <span>{title}</span>
            </div>
            {projectRole === "ADMIN" && (
              <div className="absolute flex pt-2 top-0 right-2">
                <button className=" top-2 right-6 w-7 h-7 group" onClick={EditOpen}>
                  <SvgEdit3 />
                </button>
                <button className=" top-2 right-0 w-7 h-7 group" onClick={onDelete}>
                  <Trash />
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-start pt-[12px]">
            <div className="flex space-x-5">
              <div className="font-normal text-xs text-gray-400">
                <div>{modifiedTime?.replaceAll("-", ".").slice(0, 10)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
          <div className="w-full h-full relative">
            <input
              className="w-full outline-none text-2xl border-none placeholder:text-black placeholder:font-semibold font-semibold"
              defaultValue={title}
              readOnly
            />
            <div className="mt-[10px] text-[#666]">
              {modifiedTime?.replaceAll("-", ".").slice(0, 10)}
            </div>
            <ScrollTextArea
              className="w-full h-[124px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg text-[#999]"
              defaultValue={contents}
              readOnly
            />
            <div className="absolute bottom-0 right-0">
              <button
                onClick={handleClose}
                className="bg-5 w-[58px] h-[37px] rounded-md ml-2 pt-1"
                type="button"
              >
                <span>닫기</span>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <EditAnnouncement
        edit={edit}
        setEdit={setEdit}
        title={title}
        contents={contents}
        noticeId={noticeId}
        modifiedTime={modifiedTime}
      />
    </Scroll>
  );
};

const ScrollTextArea = styled.textarea`
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const Scroll = styled.div`
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export default DetailAnnouncement;
