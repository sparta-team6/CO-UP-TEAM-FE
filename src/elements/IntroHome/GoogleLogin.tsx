import { GOOGLE_AUTH_URL } from "../../servers/OAuth";

const GoogleLogin = () => {
  const onClick = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  return (
    <div onClick={onClick}>
      <button className="w-[314px] h-[54px] text-white bg-[#5F99FF] mt-9 rounded-lg">
        구글 로그인
      </button>
    </div>
  );
};

export default GoogleLogin;
