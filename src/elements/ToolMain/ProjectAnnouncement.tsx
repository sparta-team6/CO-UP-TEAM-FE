import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetAnnouncement, usePostAnnouncement } from "../../api/AnnouncementQuery";
import { Plus } from "../../elements/Icon/Plus";
import { ProjectKey } from "../../recoil/RoomID";
import styled from "styled-components";
import EmptyAnnouncement from "../../images/Main/EmptyAnnouncement.png";
import DetailAnnouncement from "./DetailAnnouncement";

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

interface IForm {
  title: string;
  content: string;
}

const ProjectAnnouncement = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { pjId, projectRole } = useRecoilValue(ProjectKey);
  const { data: Ann } = useGetAnnouncement(pjId);
  const { mutateAsync: postAn } = usePostAnnouncement();
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    if (!data.title) {
      alert("공지 제목을 적어주세요 :)");
      return;
    }
    if (!data.content) {
      alert("내용을 입력해주세요 :)");
      return;
    }
    const post = {
      pjId,
      title: data.title,
      contents: data.content,
    };
    postAn(post).then(() => queryClient.invalidateQueries("getAnnouncement"));
    setValue("title", "");
    setValue("content", "");
    setOpen(false);
  };

  return (
    <div className="w-full h-full border border-solid bg-white rounded-2xl flex flex-col">
      <div className="w-full flex justify-center px-[34px] sm:px-[20px]">
        <div className="w-full flex items-center justify-between mb-[21px] mt-[28px]">
          <span className="font-bold text-xl">공지사항</span>
          <div onClick={handleOpen} className="cursor-pointer">
            {projectRole === "ADMIN" ? <Plus /> : ""}
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
          <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
            <input
              autoFocus
              className="w-full outline-none text-2xl border-none placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("title")}
              type="text"
              placeholder="공지 제목을 적어주세요 :)"
            />
            <span className="mt-[10px] text-[#666]">2022.xx.xx</span>
            <ScrollTextArea
              className="w-full h-[124px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg text-[#999]"
              {...register("content")}
              placeholder="내용을 입력해주세요"
            />
            <div className="absolute bottom-0 right-0">
              <button className="text-white bg-3 w-[58px] h-[37px] rounded-md pt-1" type="submit">
                <span>등록</span>
              </button>
              <button
                onClick={handleClose}
                className="bg-5 w-[58px] h-[37px] rounded-md ml-2 pt-1"
                type="button"
              >
                <span>닫기</span>
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      {Ann?.data.length === 0 ? (
        <div className="flex flex-col items-center -mt-[15px]">
          <img width={271} height={166} src={EmptyAnnouncement} alt="" />
          <span className="text-lg text-[#B0B0B0] mt-[20px]">팀원들에게 메세지를 전달해보세요</span>
        </div>
      ) : (
        <div className="flex flex-col mb-[20px] overflow-y-auto mr-[15px]">
          {Ann?.data.map((ann, index) => {
            return (
              <DetailAnnouncement
                key={ann.noticeId}
                index={index}
                title={ann.title}
                contents={ann.contents}
                modifiedTime={ann.modifiedTime}
                noticeId={ann.noticeId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const ScrollTextArea = styled.textarea`
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export default ProjectAnnouncement;
