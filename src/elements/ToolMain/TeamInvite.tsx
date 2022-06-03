import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useInviteRoom } from "../../api/ProjectQuery";
import { ProjectKey } from "../../recoil/RoomID";
import { SweetAlertHook } from "../../servers/Sweet";

interface IForm {
  socalId?: string;
}

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// 팀 초대 모달 폼
const TeamInvite = ({ setOpen }: IProps) => {
  const { register, handleSubmit } = useForm();
  const { pjId } = useRecoilValue(ProjectKey);
  const { mutateAsync } = useInviteRoom(pjId);
  const onSubmit: SubmitHandler<IForm> = (data) => {
    mutateAsync(String(data.socalId))
      .then(() => {
        // 서버 통신 후 유저 정보 바로 가져오기
        queryClient.invalidateQueries("getUser");
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
      <span className="font-semibold text-2xl">{`복구할 멤버 아이디를 적어주세요 :)`}</span>
      <form
        className="w-[352px] sm:w-[270px] h-[262px] flex flex-col items-end mt-7 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          autoFocus
          className="w-[352px] sm:w-[282px] h-10 px-2 rounded-md border-none border border-[#D1D1D1]"
          placeholder="멤버 아이디 입력"
          maxLength={40}
          {...register("socalId")}
        />
        <button
          className="w-[132px] h-[45px] rounded-md p-3 font-extrabold  bg-3 text-white"
          type="submit"
        >
          팀원 복구
        </button>
      </form>
    </div>
  );
};

export default TeamInvite;
