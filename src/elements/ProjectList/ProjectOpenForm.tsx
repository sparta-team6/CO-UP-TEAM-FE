import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
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
    Swal.fire({
      title: "입장",
      text: "해당 프로젝트로 입장하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.value) {
        mutateAsync(String(data.inviteCode))
          .then(() => {
            queryClient.invalidateQueries("getProject");
            setOpen(false);
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "프로젝트 참여 완료😊",
            });
          })
          .catch((err) => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: err.response.data,
            });
          });
      }
    });
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
          maxLength={40}
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
