import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetAnnouncement, usePostAnnouncement } from "../../api/AnnouncementQuery";
import { MyProfile } from "../../recoil/Atoms";
import EditAnnouncement from "./EditAnnouncement";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

type IForm = {
  id: number;
  title: string;
  content: string;
  name: string;
};

const ProjectAnnouncement = () => {
  const { nickname } = useRecoilValue(MyProfile);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data } = useGetAnnouncement();
  const { mutateAsync: postAn } = usePostAnnouncement();
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const post = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      name: nickname,
    };
    postAn(post).then(() => queryClient.invalidateQueries("getAnnouncement"));
    setValue("title", "");
    setValue("content", "");
    setOpen(false);
  };

  return (
    <div className="w-full h-[348px] border border-solid bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center sm:p-4">
      <div className="w-full h-8 flex items-center justify-between mb-2">
        <span className="font-bold text-lg">공지사항</span>
        <button
          className="h-full border-none bg-transparent flex items-center text-2xl"
          onClick={handleOpen}
        >
          +
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
          <form className="w-full h-full relative space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-full outline-none border-none placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("title", { required: true })}
              type="text"
              placeholder="제목을 입력해주세요"
            />
            <textarea
              className="w-full outline-none border-none resize-none overflow-y-auto"
              rows={14}
              {...register("content", { required: true })}
              placeholder="내용을 입력해주세요"
            />
            <div className="absolute bottom-0 right-0">
              <button type="submit">등록</button>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="w-full h-full space-y-2 overflow-y-auto">
        {data?.data?.map((data, index) => {
          return (
            <div
              key={index}
              className="w-full h-16 bg-white border rounded-lg overflow-hidden flex"
            >
              <div className="w-2 h-full bg-3" />
              <div className="w-full h-full ml-4 mr-2 flex flex-col">
                <div className="flex">
                  <div className="w-full font-semibold pt-3">{data.title}</div>
                  <EditAnnouncement {...data} />
                </div>
                <div className="flex justify-between pt-1">
                  <div className="flex space-x-5">
                    <div className="font-normal text-xs text-gray-400">{data.id}</div>
                    <div className="font-normal text-xs text-gray-400">{data.name}</div>
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
