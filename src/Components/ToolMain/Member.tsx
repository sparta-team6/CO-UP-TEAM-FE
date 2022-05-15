import { useRecoilValue } from "recoil";
import { useGetProjectUser } from "../../api/UserQuery";
import { MyProfile, ProjectKey } from "../../recoil/Atoms";

const Member = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetProjectUser(String(pjId));
  const user = useRecoilValue(MyProfile);
  console.log(data);
  return (
    <div className="w-full h-full">
      <h3 className="text-base font-bold">팀원</h3>
      <div className="group w-full h-14 relative flex items-center space-x-2">
        <img className="rounded-full" width="40px" height="40px" src={user.profileImage} alt="" />
        <span className="font-semibold">{user.nickname}</span>
        <div className="hidden w-[250px] bg-gray-500  group-hover:flex flex-col items-center sm:group-focus:block absolute right-[-270px]">
          <img className="rounded-full" width="80px" height="80px" src={user.profileImage} alt="" />
          <div>{user.nickname}</div>
          <div>{user.aboutMe}</div>
        </div>
      </div>
      {data?.data?.map((box, index) => {
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
      })}
    </div>
  );
};

export default Member;
