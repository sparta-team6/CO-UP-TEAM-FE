import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetAnnouncement, usePostAnnouncement } from "../../api/AnnouncementQuery";
import EditAnnouncement from "./EditAnnouncement";
import { Plus } from "../../elements/Icon/Plus";
import { ProjectKey } from "../../recoil/RoomID";

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
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: Ann } = useGetAnnouncement(pjId);
  const { mutateAsync: postAn } = usePostAnnouncement();
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
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
      <div className="flex items-center justify-between mb-[21px] mx-[34px] mt-[28px]">
        <span className="font-bold text-xl">공지사항</span>
        <div onClick={handleOpen} className="cursor-pointer">
          <Plus />
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
              className="w-full outline-none text-2xl border-none placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("title", { required: true })}
              type="text"
              placeholder="공지 제목을 적어주세요 :)"
            />
            <div className="mt-[10px] text-[#666]">2022.xx.xx</div>
            <textarea
              className="w-full h-[124px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg text-[#999]"
              {...register("content", { required: true })}
              placeholder="내용을 입력해주세요"
            />
            <div className="absolute bottom-0 right-0">
              <button className="text-white bg-3 w-[58px] h-[37px] rounded-md pt-1" type="submit">
                등록
              </button>
              <button
                onClick={handleClose}
                className="bg-5 w-[58px] h-[37px] rounded-md ml-2 pt-1"
                type="button"
              >
                닫기
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="w-full h-full space-y-2 overflow-y-auto flex flex-col items-center">
        {Ann?.data?.map((data, index) => {
          return (
            <div
              key={index}
              className="w-[91%] max-w-[548px] min-h-[68px] bg-white border rounded-lg overflow-hidden flex"
            >
              <div className="w-2 h-full bg-3" />
              <div className="w-full h-full ml-4 mr-2 flex flex-col">
                <div className="flex">
                  <div className="w-full text-[13px] font-semibold pt-3">{data.title}</div>
                  <EditAnnouncement {...data} />
                </div>
                <div className="flex justify-between pt-1">
                  <div className="flex space-x-5">
                    <div className="font-normal text-xs text-gray-400">{data.contents}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectAnnouncement;
