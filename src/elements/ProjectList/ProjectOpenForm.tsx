import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { usePostOpenRoom } from "../../api/ProjectQuery";
import { ProjectInvite } from "../../recoil/AtomInvite";
import { SweetAlertHook } from "../../servers/Sweet";

interface IForm {
  inviteCode?: string;
}

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProjectOpenForm = ({ setOpen }: IProps) => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = usePostOpenRoom();
  const { inviteCode } = useRecoilValue(ProjectInvite);
  console.log(inviteCode);
  const onSubmit: SubmitHandler<IForm> = (data) => {
    mutateAsync(String(data.inviteCode))
      .then(() => {
        queryClient.invalidateQueries("getProject");
        setOpen(false);
        SweetAlertHook(1000, "success", "프로젝트 참여 완료😊");
      })
      .catch((err) => {
        setOpen(false);
        SweetAlertHook(1000, "error", err.response.data);
      });
  };
  return (
    <div className="w-[448px] sm:w-[320px] h-[262px] flex flex-col p-12 sm:p-8">
      <span className="font-semibold text-2xl">{`코드번호를 입력해주세요 :)`}</span>
      <form
        className="w-[352px] sm:w-[270px] h-[262px] flex flex-col items-end mt-7 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          autoFocus
          className="w-[352px] sm:w-[282px] h-10 px-2 rounded-md border-none border border-[#D1D1D1]"
          placeholder="초대코드 입력"
          maxLength={40}
          {...register("inviteCode")}
        />
        <button
          className="w-[132px] h-[45px] rounded-md p-3 font-extrabold  bg-3 text-white"
          type="submit"
        >
          프로젝트 입장
        </button>
      </form>
    </div>
  );
};

export default ProjectOpenForm;
