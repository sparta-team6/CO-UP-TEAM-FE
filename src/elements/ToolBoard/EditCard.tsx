import { Box, Modal } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetCardDetail, useUpdateCards } from "../../api/BoardQuery";
import { ProjectKey } from "../../recoil/Atoms";

type IPros = {
  open: boolean;
  toDoName: string;
  toDoText: string;
  toDoTitle: string;
  toDoId: string;
  close: () => void;
};

type IForm = {
  title: string;
  text: string;
  name: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

const EditCard = ({ open, close, toDoName, toDoText, toDoTitle, toDoId }: IPros) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync } = useUpdateCards(pjId);
  const { data: Card } = useGetCardDetail(toDoId);
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    const post = {
      kbcId: String(Card?.data.kbcId),
      kbbId: String(Card?.data.kbbId),
      manager: data.name,
      title: data.title,
      contents: data.text,
      position: Number(Card?.data.position),
    };
    console.log(post);
    mutateAsync(post).then(() => {
      queryClient.invalidateQueries(["getCard", String(Card?.data.kbbId)]);
    });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[690px] h-[370px] rounded-xl sm:w-full">
          <span>{toDoTitle}</span>
          <span>{toDoText}</span>
          <span>{toDoName}</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} defaultValue={toDoTitle} />
            <input {...register("text")} defaultValue={toDoText} />
            <input {...register("name")} defaultValue={toDoName} />
            <button type="submit">수정</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCard;
