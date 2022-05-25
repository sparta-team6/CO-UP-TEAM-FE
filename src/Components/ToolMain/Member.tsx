import imgCrown from "../../images/img_crown.png";
import { SvgUser } from "../../elements/Icon/SvgUser";
import { useRecoilValue } from "recoil";
import { MyProfile } from "../../recoil/MyProfile";
import { ProjectKey } from "../../recoil/RoomID";
import { useGetProjectUser } from "../../api/UserQuery";
import { useGetRoomDetail, useKickRoom } from "../../api/ProjectQuery";

const Member = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetProjectUser(pjId);
  const { data: aa } = useGetRoomDetail(pjId);
  console.log(aa);
  const user = useRecoilValue(MyProfile);
  const TeamUsers = data?.data.filter((u) => u.loginId !== user.loginId);
  const { mutateAsync: KickUser } = useKickRoom(pjId);
  const onClick = (loginId: string) => {
    KickUser(loginId).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="w-full h-full">
      <div className="flex items-center mt-7">
        <SvgUser />
        <span className="text-lg font-bold mt-1 ml-1 dark:text-white">팀원</span>
      </div>
      <div className="group w-full mt-[20px] relative flex items-center space-x-2">
        {aa?.data.projectRole === "ADMIN" && (
          <img className="absolute -top-1 left-6" src={imgCrown} alt="" />
        )}
        <img className="rounded-full m-0" width={36} height={36} src={user?.profileImage} alt="" />
        <span className="font-semibold dark:text-white">{user?.nickname}</span>
        <div className="hidden w-[344px] min-h-[134px] bg-5 group-hover:flex sm:group-focus:block absolute right-[-330px] top-0 rounded-lg shadow-md">
          <div className="w-full h-full px-3 py-6 flex flex-col">
            <div className="w-full h-full flex flex-col space-x-5">
              <div className="h-full flex items-center span">
                <img
                  className="rounded-full"
                  width={36}
                  height={36}
                  src={user?.profileImage}
                  alt=""
                />
                <span className="ml-[12px] font-semibold ">{user?.nickname}</span>
              </div>
              <div className="flex flex-col w-full h-full pl-[28px] pr-2 space-y-1 mt-3">
                <span>{user?.aboutMe}</span>
                <span className="text-xs">{user?.url}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {TeamUsers?.map((teamUser, index) => {
        return (
          <div key={index} className="group w-full mt-[20px] relative flex items-center space-x-2">
            <img
              className="rounded-full m-0"
              width={36}
              height={36}
              src={teamUser.profileImage}
              alt=""
            />
            <span className="font-semibold dark:text-white">{teamUser.nickname}</span>
            <button onClick={() => onClick(String(teamUser.loginId))}>추방</button>
            <div className="hidden w-[344px] min-h-[134px] bg-5  group-hover:flex sm:group-focus:block absolute right-[-330px] top-0 rounded-lg shadow-md">
              <div className="w-full h-full px-3 py-6 flex flex-col">
                <div className="w-full h-full flex flex-col space-x-5">
                  <div className="h-full flex items-center span">
                    <img
                      className="rounded-full"
                      width={36}
                      height={36}
                      src={teamUser.profileImage}
                      alt=""
                    />
                    <span className="ml-[12px] font-semibold ">{teamUser.nickname}</span>
                  </div>
                  <div className="flex flex-col w-full h-full pl-[28px] pr-2 space-y-1 mt-3">
                    <span>{teamUser.aboutMe}</span>
                    <span className="text-xs">{teamUser.url}</span>
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
