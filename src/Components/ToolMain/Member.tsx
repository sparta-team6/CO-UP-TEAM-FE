import { SvgUser } from "../../elements/Icon/SvgUser";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import { useGetProjectUser } from "../../api/UserQuery";
import { useKickRoom } from "../../api/ProjectQuery";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { useState } from "react";
import { MyProfile } from "../../recoil/MyProfile";
import TeamAdmin from "../../elements/ToolMain/TeamAdmin";
import TeamMe from "../../elements/ToolMain/TeamMe";

const Member = () => {
  const { pjId, projectRole } = useRecoilValue(ProjectKey);
  const { data } = useGetProjectUser(pjId);
  const User = useRecoilValue(MyProfile);
  const AllUsers = data?.data.slice(1);
  const TeamUsers = AllUsers?.filter((t) => t.loginId !== User.loginId);
  const { mutateAsync: KickUser } = useKickRoom(pjId);
  const [kickOpen, setKickOpen] = useState(false);
  const handleKick = () => {
    setKickOpen(!kickOpen);
  };
  const onClick = (loginId: string, nickname: string) => {
    Swal.fire({
      title: `${nickname}님을 추방시키겠습니까?`,
      text: "추방시키면 다시 프로젝트에 참가할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "추방하자",
      cancelButtonText: "취소하자",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        KickUser(loginId).then((res) => {
          queryClient.invalidateQueries("getUser");
        });
      }
    });
  };
  const projectAdmin = data?.data[0];
  return (
    <div className="tutorial-main3 w-full h-full">
      <div className="flex justify-between items-center mt-[28px] sm:mt-[15px]">
        <div className="flex items-center">
          <SvgUser />
          <span className="text-lg font-bold ml-1 dark:text-white">팀원</span>
        </div>
        {projectRole === "ADMIN" && (
          <div>
            <button onClick={handleKick} className="w-[62px] h-[24px] bg-[#E7EBF2] rounded text-xs">
              내보내기
            </button>
          </div>
        )}
      </div>
      <TeamAdmin {...projectAdmin} />
      {projectRole !== "ADMIN" && <TeamMe {...User} />}
      {TeamUsers?.map((teamUser, index) => {
        return (
          <div key={index} className="group w-full mt-[12px] relative flex items-center space-x-2">
            <div className="w-full flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  className="rounded-full m-0"
                  width={36}
                  height={36}
                  src={teamUser.profileImage}
                  alt=""
                />
                <span className="font-semibold dark:text-white mt-[2px] pr-[10px]">
                  {teamUser.nickname}
                </span>
              </div>
              <div>
                {kickOpen && (
                  <button
                    className="flex justify-center items-center text-2xl w-[24px] h-[24px] bg-[#DE4A06] rounded-full text-white mr-[38px]"
                    onClick={() => onClick(String(teamUser.loginId), String(teamUser.nickname))}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
            <div className="sm:left-[-30%] sm:top-[-350px] hidden w-[334px] min-h-[120px] sm:z-50 bg-5 dark:bg-8 border-[#E7EBF2] dark:border-[#666666] border-[1px] border-solid group-hover:flex sm:group-focus:block absolute right-[-315px] top-[-80px] rounded-lg shadow-md">
              <div className="w-full h-full px-[20px] py-[13px] flex flex-col">
                <div className="w-full h-full flex">
                  <div className="h-full flex items-center span">
                    <img
                      className="rounded-full"
                      width={36}
                      height={36}
                      src={teamUser.profileImage}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col w-full h-full pl-[14px] pt-[14px]">
                    <span className="font-semibold">{teamUser.nickname}</span>
                    <span className="whitespace-pre-wrap break-all pt-[12px] pb-[18px]">
                      {teamUser.aboutMe}
                    </span>
                    <a
                      href={teamUser.url}
                      target="_blank"
                      className="text-[12px] text-8 dark:text-2"
                      rel="noreferrer"
                    >
                      {teamUser.url}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Member;
