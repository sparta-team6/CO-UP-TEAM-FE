import imgCrown from "../../images/img_crown.png";
import { SvgUser } from "../../elements/Icon/SvgUser";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import { useGetProjectUser } from "../../api/UserQuery";
import { useKickRoom } from "../../api/ProjectQuery";
import Swal from "sweetalert2";
import { queryClient } from "../..";

const Member = () => {
  const { pjId, projectRole } = useRecoilValue(ProjectKey);
  const { data } = useGetProjectUser(pjId);
  const TeamUsers = data?.data.slice(1);
  const { mutateAsync: KickUser } = useKickRoom(pjId);
  const onClick = (loginId: string, nickname: string) => {
    Swal.fire({
      title: "추방",
      text: `${nickname}님을 추방시키겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "넵!",
      cancelButtonText: "취소!",
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
      <div className="flex items-center mt-[28px] sm:mt-[15px]">
        <SvgUser />
        <span className="text-lg font-bold ml-1 dark:text-white">팀원</span>
      </div>
      <div className="group w-full mt-[20px] relative flex items-center space-x-2">
        <img className="absolute -top-1 left-6" src={imgCrown} alt="" />
        <img
          className="rounded-full m-0"
          width={36}
          height={36}
          src={projectAdmin?.profileImage}
          alt=""
        />
        <span className="font-semibold dark:text-white">{projectAdmin?.nickname}</span>
        <div className="sm:left-[-30%] sm:top-[-300px] hidden w-[334px] min-h-[120px] sm:z-50 bg-5 dark:bg-8 border-[#E7EBF2] dark:border-[#666666] border-[1px] border-solid group-hover:flex sm:group-focus:block absolute right-[-315px] top-[-80px] rounded-lg shadow-md">
          <div className="w-full h-full px-[20px] py-[13px] flex flex-col">
            <div className="w-full h-full flex">
              <div className="h-full flex items-center span">
                <img
                  className="rounded-full"
                  width={36}
                  height={36}
                  src={projectAdmin?.profileImage}
                  alt=""
                />
              </div>
              <div className="flex flex-col w-full h-full pl-[14px] pt-[14px]">
                <span className="font-semibold ">{projectAdmin?.nickname}</span>
                <span className="whitespace-pre-wrap break-all pt-[12px] pb-[18px]">
                  {projectAdmin?.aboutMe}
                </span>
                <a
                  href={projectAdmin?.url}
                  target="_blank"
                  className="text-xs text-8 dark:text-2"
                  rel="noreferrer"
                >
                  {projectAdmin?.url}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {TeamUsers?.map((teamUser, index) => {
        return (
          <div key={index} className="group w-full mt-[12px] relative flex items-center space-x-2">
            <img
              className="rounded-full m-0"
              width={36}
              height={36}
              src={teamUser.profileImage}
              alt=""
            />
            <span className="font-semibold dark:text-white">{teamUser.nickname}</span>
            {projectRole === "ADMIN" && (
              <button onClick={() => onClick(String(teamUser.loginId), String(teamUser.nickname))}>
                추방
              </button>
            )}
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
