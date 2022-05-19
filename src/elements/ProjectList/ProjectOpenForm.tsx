import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostOpenRoom } from "../../api/ProjectQuery";

interface IForm {
  inviteCode?: string;
}

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
    <div className="w-[448px] h-[262px] flex flex-col p-12">
      <h1 className="font-semibold text-2xl">{`코드번호를 입력해주세요 :)`}</h1>
      <form
        className="w-[352px] h-[262px] flex flex-col items-end mt-7 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-[352px] h-10 px-2 rounded-md border-none border border-[#D1D1D1]"
          placeholder="초대코드 입력"
          {...register("inviteCode")}
        />
        <button
          className="w-[132px] h-[45px] rounded-md p-3 font-extrabold sm:hidden bg-3 text-white"
          type="submit"
        >
          프로젝트 입장
        </button>
      </form>
    </div>
  );
};

export default ProjectOpenForm;
