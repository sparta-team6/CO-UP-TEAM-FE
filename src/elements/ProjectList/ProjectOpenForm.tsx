import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type IForm = {
  invite_code?: number;
};

const ProjectOpenForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    navigate(`/tool/${data.invite_code}`);
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="초대코드 입력" {...register("invite_code")} />
        <button type="submit">프로젝트 입장</button>
      </form>
    </React.Fragment>
  );
};

export default ProjectOpenForm;
