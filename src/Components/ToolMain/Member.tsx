import imgCrown from "../../images/img_crown.png";
import { SvgUser } from "../../elements/Icon/SvgUser";
import { useRecoilValue } from "recoil";
import { MyProfile } from "../../recoil/MyProfile";
import { ProjectKey } from "../../recoil/RoomID";
import { useGetProjectUser } from "../../api/UserQuery";

const Member = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetProjectUser(pjId);
  console.log(data?.data);
  const user = useRecoilValue(MyProfile);
  return (
    <div className="w-full h-full">
      <div className="flex items-center mt-7">
        <SvgUser />
        <h3 className="text-lg font-bold mt-1 ml-1 dark:text-white">팀원</h3>
      </div>
      <div className="group w-full mt-[20px] relative flex items-center space-x-2">
        <img className="absolute -top-1 left-6" src={imgCrown} alt="" />
        <img className="rounded-full m-0" width={36} height={36} src={user?.profileImage} alt="" />
        <span className="font-semibold dark:text-white">{user?.nickname}</span>
        <div className="hidden w-[344px] min-h-[134px] bg-5  group-hover:flex sm:group-focus:block absolute right-[-330px] top-0 rounded-lg shadow-md">
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
                <div className="ml-[12px] font-semibold ">{user?.nickname}</div>
              </div>
              <div className="flex flex-col w-full h-full pl-[28px] pr-2 space-y-1 mt-3">
                <div>{user?.aboutMe}</div>
                <div className="text-xs">{user?.url}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {data?.data?.map((box, index) => {
        return (
          <div key={index} className="group w-full h-14 relative flex items-center space-x-2">
            <img
              className="rounded-full"
              width="40px"
              height="40px"
              src={box.profileImage}
              alt=""
            />
            <span className="font-semibold">{box.nickname}</span>
            <div className="hidden w-[250px] bg-gray-500  group-hover:flex flex-col items-center sm:group-focus:block absolute right-[-270px]">
              <img
                className="rounded-full"
                width="80px"
                height="80px"
                src={box.profileImage}
                alt=""
              />
              <div>{box.url}</div>
              <div>{box.aboutMe}</div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Member;
