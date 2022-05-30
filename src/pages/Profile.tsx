import React from "react";
import { Helmet } from "react-helmet";
import EditProfile from "../Components/Profile/EditProfile";

const Profile = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>CO-UP | 프로필</title>
      </Helmet>
      <div className="w-full h-[calc(100vh-4rem)] bg-[#F0F3F6] dark:bg-7 flex flex-col items-center justify-center absolute bottom-0">
        <div className="w-[1100px] h-full p-4 flex flex-col justify-center items-center md:w-full sm:justify-start">
          <EditProfile />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
