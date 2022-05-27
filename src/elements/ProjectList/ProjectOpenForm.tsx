import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { usePostOpenRoom } from "../../api/ProjectQuery";
import { ProjectInvite } from "../../recoil/AtomInvite";

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
    if (confirm("해당 프로젝트로 입장하시겠습니까?")) {
      mutateAsync(String(data.inviteCode))
        .then(() => {
          queryClient.invalidateQueries("getProject");
          setOpen(false);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };
  return (
    <div className="w-[448px] h-[262px] flex flex-col p-12">
      <span className="font-semibold text-2xl">{`코드번호를 입력해주세요 :)`}</span>
      <form
        className="w-[352px] h-[262px] flex flex-col items-end mt-7 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          autoFocus
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
