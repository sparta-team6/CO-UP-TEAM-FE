import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostOpenRoom } from "../../api/ProjectQuery";

type IForm = {
  inviteCode?: number;
};

const ProjectOpenForm = () => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = usePostOpenRoom();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    mutateAsync(Number(data.inviteCode)).then(() => {
      navigate(`/tool/${data.inviteCode}`);
    });
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="초대코드 입력" {...register("inviteCode")} />
        <button type="submit">프로젝트 입장</button>
      </form>
    </React.Fragment>
  );
};

export default ProjectOpenForm;
