import { useRecoilValue } from "recoil";
import { useGetProjectUser } from "../../api/UserQuery";
import { MyProfile } from "../../recoil/Atoms";

const Member = () => {
  const { data } = useGetProjectUser();
  const user = useRecoilValue(MyProfile);
  return (
    <div className="w-full h-full">
      <h3 className="text-base font-bold">팀원</h3>
      <div className="group w-full h-14 relative flex items-center space-x-2">
        <img
          className="rounded-full"
          width="40px"
          height="40px"
          src={user.profile_image}
          alt=""
        />
        <span className="font-semibold">{user.nickname}</span>
        <div className="hidden w-[250px] bg-gray-500  group-hover:flex flex-col items-center sm:group-focus:block absolute right-[-270px]">
          <img
            className="rounded-full"
            width="80px"
            height="80px"
            src={user.profile_image}
            alt=""
          />
          <div>{user.email}</div>
          <div>{user.nickname}</div>
        </div>
      </div>
      {data?.data?.map((box, index) => {
        return (
          <div
            key={index}
            className="group w-full h-14 relative flex items-center space-x-2"
          >
            <img
              className="rounded-full"
              width="40px"
              height="40px"
              src={box.profile}
              alt=""
            />
            <span className="font-semibold">{box.name}</span>
            <div className="hidden w-[250px] bg-gray-500  group-hover:flex flex-col items-center sm:group-focus:block absolute right-[-270px]">
              <img
                className="rounded-full"
                width="80px"
                height="80px"
                src={box.profile}
                alt=""
              />
              <div>{box.URL}</div>
              <div>{box.comment}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Member;
