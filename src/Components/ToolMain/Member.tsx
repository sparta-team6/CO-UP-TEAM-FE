import { SvgUser } from "../../elements/Icon/SvgUser";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import { useGetProjectUser } from "../../api/UserQuery";
import { useKickRoom } from "../../api/ProjectQuery";
import Swal from "sweetalert2";
import { queryClient } from "../..";
import { MyProfile } from "../../recoil/MyProfile";
import TeamAdmin from "../../elements/ToolMain/TeamAdmin";
import TeamMe from "../../elements/ToolMain/TeamMe";
import { KickBtn } from "../../recoil/AtomKickBtn";
import { Option } from "../../elements/Icon/Option";

const Member = () => {
  const { pjId, projectRole } = useRecoilValue(ProjectKey);
  const { data } = useGetProjectUser(pjId);
  const User = useRecoilValue(MyProfile);
  const AllUsers = data?.data.slice(1);
  const TeamUsers = AllUsers?.filter((t) => t.loginId !== User.loginId);
  const { mutateAsync: KickUser } = useKickRoom(pjId);
  const [kickOpen, setKickOpen] = useRecoilState(KickBtn);
  const handleKick = () => {
    setKickOpen(!kickOpen);
  };
  const onClick = (loginId: string, nickname: string) => {
    Swal.fire({
      title: `${nickname}님을 내보내시겠습니까?`,
      text: "내보내면 다시 프로젝트에 참가할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "내보내기",
      cancelButtonText: "돌아가기",
      confirmButtonColor: "#5F99FF",
      cancelButtonColor: "#D7DCE5",
    }).then((result) => {
      if (result.value) {
        KickUser(loginId).then(() => {
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
          <span className="text-sm ml-[8px]">({AllUsers && AllUsers?.length + 1})</span>
        </div>
        {projectRole === "ADMIN" && AllUsers && AllUsers?.length > 0 && (
          <div>
            <button onClick={handleKick} className="w-[21px] h-[21px] hover:bg-h2 bg-transparent">
              <Option />
            </button>
          </div>
        )}
      </div>
      <TeamAdmin {...projectAdmin} />
      {projectRole !== "ADMIN" && <TeamMe {...User} />}
      {TeamUsers?.map((teamUser, index) => {
        return (
          <div
            key={index}
            className="group w-full mt-[12px] relative flex items-center space-x-2 last:pb-[80px]"
          >
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
              <div className="flex items-center">
                {kickOpen && (
                  <button
                    className="flex justify-center items-center text-2xl w-[24px] h-[24px] bg-[#DE4A06] rounded-full text-white"
                    onClick={() => onClick(String(teamUser.loginId), String(teamUser.nickname))}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
            <div className="left-[-13%] bottom-[36px] hidden w-[280px] sm:w-[275px] min-h-[120px] z-50 bg-5 dark:bg-8 border-[#E7EBF2] dark:border-[#666666] border-[1px] border-solid group-hover:flex sm:group-focus:block absolute right-[-315px] rounded-lg shadow-md">
              <div className="w-full h-full px-[22px] py-[12px] flex flex-col">
                <div className="w-full h-full flex">
                  <div className="h-full flex items-center">
                    <img
                      className="rounded-full"
                      width={36}
                      height={36}
                      src={teamUser.profileImage}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col w-[210px] h-full pl-[12px] pt-[12px]">
                    <span className="font-semibold">{teamUser.nickname}</span>
                    <span className="whitespace-pre-wrap break-all pt-[12px] pb-[18px]">
                      {teamUser.aboutMe}
                    </span>
                    <a
                      href={teamUser.url}
                      target="_blank"
                      className="text-[12px] text-8 dark:text-2 text-ellipsis overflow-hidden whitespace-nowrap"
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
