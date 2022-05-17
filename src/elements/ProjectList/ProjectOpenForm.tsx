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
    <div className="w-full h-full flex flex-col  justify-between">
      <h1 className="font-semibold text-lg">{`코드번호를 입력해주세요 :)`}</h1>
      <form className="flex flex-col items-end space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input className="w-full" placeholder="초대코드 입력" {...register("inviteCode")} />
        <button
          className="w-40 rounded-md p-3 font-extrabold sm:hidden bg-3 text-white"
          type="submit"
        >
          프로젝트 입장
        </button>
      </form>
    </div>
  );
};

export default ProjectOpenForm;
