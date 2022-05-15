import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import {
  Announcement,
  useDelAnnouncement,
  useUpdateAnnouncement,
} from "../../api/AnnouncementQuery";
import { MyProfile } from "../../recoil/Atoms";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

type IProp = {
  title: string;
  content: string;
};

const EditAnnouncement = ({ id, title, content }: Announcement) => {
  const [open, setOpen] = useState(false);
  const { nickname } = useRecoilValue(MyProfile);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutateAsync: DELAN } = useDelAnnouncement(Number(id));
  const { mutateAsync: UpdateAN } = useUpdateAnnouncement(Number(id));
  const { register, handleSubmit } = useForm<IProp>();

  const onSubmit: SubmitHandler<IProp> = (data) => {
    UpdateAN({
      id: Number(id),
      title: data.title,
      content: data.content,
      name: nickname,
    }).then(() => {
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
      <div>
        <button onClick={onDelete}>삭제</button>
        <button onClick={handleOpen}>수정</button>
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
              defaultValue={title}
            />
            <textarea
              className="w-full outline-none border-none resize-none overflow-y-auto"
              rows={14}
              {...register("content", { required: true })}
              placeholder="내용을 입력해주세요"
              defaultValue={content}
            />
            <div className="absolute bottom-0 right-0">
              <button type="submit">수정</button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(EditAnnouncement);
