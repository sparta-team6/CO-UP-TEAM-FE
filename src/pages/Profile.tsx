import React from "react";
import EditProfile from "../Components/Profile/EditProfile";

const Profile = () => {
  return (
    <React.Fragment>
      <div className="w-full h-[calc(100vh-4rem)] bg-slate-100 flex flex-col items-center justify-center absolute bottom-0">
        <div className="w-[1300px] h-full p-4 flex flex-col justify-center items-center md:w-full sm:justify-start">
          <EditProfile />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
