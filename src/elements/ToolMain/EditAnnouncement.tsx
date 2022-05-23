import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "../..";
import {
  Announcement,
  useDelAnnouncement,
  useUpdateAnnouncement,
} from "../../api/AnnouncementQuery";
import { SvgEdit3 } from "../Icon/SvgEdit3";
import { Trash } from "../Icon/Trash";

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
  contents: string;
}

const EditAnnouncement = ({ title, contents, noticeId }: Announcement) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutateAsync: DELAN } = useDelAnnouncement(String(noticeId));
  const { mutateAsync: UpdateAN } = useUpdateAnnouncement();
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    const Update = {
      noticeId: String(noticeId),
      title: data.title,
      contents: data.content,
    };
    UpdateAN(Update).then(() => {
      queryClient.invalidateQueries("getAnnouncement");
    });
    setOpen(false);
  };
  const onDelete = () => {
    DELAN().then(() => {
      queryClient.invalidateQueries("getAnnouncement");
    });
  };
  return (
    <>
      <div className="flex pt-2">
        <button onClick={handleOpen}>
          <SvgEdit3 />
        </button>
        <button onClick={onDelete}>
          <Trash />
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
              autoFocus
              className="w-full outline-none border-none text-2xl placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("title", { required: true })}
              type="text"
              placeholder="공지 제목을 적어주세요 :)"
              defaultValue={title}
            />
            <div className="mt-[10px] text-[#666]">2022.xx.xx</div>
            <textarea
              className="w-full h-[124px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg text-[#999]"
              {...register("content", { required: true })}
              placeholder="내용을 입력해주세요"
              defaultValue={contents}
            />
            <div className="absolute bottom-0 right-0">
              <button className="text-white bg-3 w-[58px] h-[37px] rounded-md pt-1" type="submit">
                수정
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(EditAnnouncement);
