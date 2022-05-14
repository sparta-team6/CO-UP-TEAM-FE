import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostOpenRoom } from "../../api/ProjectQuery";

type IForm = {
  inviteCode?: string;
};

const ProjectOpenForm = () => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = usePostOpenRoom();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data.inviteCode);
    mutateAsync(String(data.inviteCode))
      .then((res) => {
        console.log(res);
        navigate(`/tool/${data.inviteCode}`);
      })
      .catch((err) => {
        alert(err.response.data);
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
