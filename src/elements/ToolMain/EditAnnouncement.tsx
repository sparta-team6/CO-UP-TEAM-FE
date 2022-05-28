import { Box, Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { useUpdateAnnouncement } from "../../api/AnnouncementQuery";
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

interface IProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  title?: string;
  contents?: string;
  noticeId?: string;
  modifiedTime?: string;
}

interface IForm {
  title: string;
  content: string;
  contents: string;
}

const EditAnnouncement = ({ title, contents, noticeId, modifiedTime, edit, setEdit }: IProps) => {
  const handleClose = () => setEdit(false);
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync: UpdateAN } = useUpdateAnnouncement();
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    if (!data.title) {
      alert("공지 제목을 적어주세요 :)");
      return;
    }
    if (!data.content) {
      alert("내용을 입력해주세요 :)");
      return;
    }

    const Update = {
      pjId,
      noticeId: String(noticeId),
      title: data.title,
      contents: data.content,
    };
    Swal.fire({
      title: "수정",
      text: "진짜 수정하시겠어요?!!",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.value) {
        UpdateAN(Update).then(() => {
          queryClient.invalidateQueries("getAnnouncement");
        });
        setEdit(false);
      }
    });
  };
  return (
    <>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
          <form className="w-full h-full relative space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              autoFocus
              className="w-full outline-none border-none text-2xl placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("title")}
              type="text"
              placeholder="공지 제목을 적어주세요 :)"
              defaultValue={title}
            />
            <div className="mt-[10px] text-[#666]">
              {modifiedTime?.replaceAll("-", ".").slice(0, 10)}
            </div>
            <Scroll
              className="w-full h-[160px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg text-[#999]"
              {...register("content")}
              placeholder="내용을 입력해주세요"
              maxLength={254}
              defaultValue={contents}
            />
            <div className="absolute bottom-0 right-0">
              <button className="text-white bg-3 w-[58px] h-[37px] rounded-md pt-1" type="submit">
                수정
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
    </>
  );
};

export default React.memo(EditAnnouncement);

const Scroll = styled.textarea`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;
