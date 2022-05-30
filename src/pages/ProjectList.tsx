import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useMyInfo } from "../api/UserQuery";
import ProjectData from "../Components/ProjectList/ProjectData";
import ProjectMake from "../Components/ProjectList/ProjectMake";
import ProjectOpen from "../Components/ProjectList/ProjectOpen";
import JoyrideContainer from "../Components/Tutorial/JoyrideContainer";
import { projectListSteps } from "../Components/Tutorial/Steps";
import { MyProfile } from "../recoil/MyProfile";
import { getAccessTokenFromCookie, getFreshTokenFromCookie } from "../servers/Cookie";
import family from "../images/ProjectList/coup_family.png";

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
    <>
      <Helmet>
        <title>CO-UP | 프로젝트 리스트</title>
      </Helmet>
      <div className="w-full min-h-screen bg-[#f0f3f7] dark:bg-7">
        <div className="w-full h-auto  flex flex-col items-center justify-center relative">
          <div className="w-full h-full flex flex-col items-center pt-36 sm:pt-24">
            <div className=" w-[1188px] flex justify-between items-center mb-8 md:w-[90%]">
              <span className="text-4xl leading-[50px] sm:text-3xl">프로젝트 리스트</span>
              <ProjectOpen />
            </div>
            <div className="w-[1188px] h-full flex flex-wrap justify-start sm:justify-center md:w-[90%] md:h-auto">
              <ProjectData />
              <div className="pl2 w-[288px] h-[320px] rounded-lg border-[1px] border-solid border-gray-300 flex justify-center items-center sm:w-full mb-[20px]">
                <ProjectMake />
              </div>
              <img src={family} width={288} height={320} alt="" className="ml-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
