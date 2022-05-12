import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="hidden w-full h-12 bg-green-300 fixed top-0 sm:flex justify-between">
      <div className="w-[21rem]">
        <Link to="/">로고</Link>
      </div>
      <Link to="/tool/1/chat">채팅</Link>
    </div>
  );
};

export default Footer;
