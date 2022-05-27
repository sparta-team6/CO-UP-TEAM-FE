import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useMyInfo } from "../api/UserQuery";
import ProjectData from "../Components/ProjectList/ProjectData";
import ProjectMake from "../Components/ProjectList/ProjectMake";
import ProjectOpen from "../Components/ProjectList/ProjectOpen";
import { MyProfile } from "../recoil/MyProfile";
import { getAccessTokenFromCookie, getFreshTokenFromCookie } from "../servers/Cookie";

const ProjectList = () => {
  const navigate = useNavigate();
  const SetUser = useSetRecoilState(MyProfile);
  const { data } = useMyInfo();
  const user = data?.data;
  useEffect(() => {
    SetUser(user);
  }, [data]);

  // useEffect(() => {
  //   const accessToken = getAccessTokenFromCookie();
  //   const refreshToken = getFreshTokenFromCookie();
  //   if ((accessToken !== undefined && refreshToken !== undefined) === true) {
  //     navigate("/projectList");
  //   } else {
  //     alert("로그인을 해주세요 :)");
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <div className="w-full h-auto bg-[#f0f3f7] flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center pt-36 sm:pt-32">
        <div className=" w-[1188px] flex justify-between items-center mb-8 md:w-[90%]">
          <span className="text-4xl leading-[50px] sm:text-3xl">프로젝트 리스트</span>
          <ProjectOpen />
        </div>
        <div className="w-[1188px] h-full flex flex-wrap justify-start sm:justify-center md:w-[90%] md:h-auto">
          <ProjectData />
          <div className="w-[288px] h-[320px] rounded-lg border-[1px] border-solid border-gray-300 flex justify-center items-center sm:w-full mb-[20px]">
            <ProjectMake />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
