import { Link, useLocation, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MBoard } from "../elements/Icon/mobile/MBoard";
import { MChat } from "../elements/Icon/mobile/MChat";
import { MDoc } from "../elements/Icon/mobile/MDoc";
import { MHome } from "../elements/Icon/mobile/MHome";
import { ProjectKey } from "../recoil/RoomID";

const Footer = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const location = useLocation();
  const mainMatch = useMatch("/tool/:id");
  const docMatch = useMatch("/tool/:id/document/*");
  const boardMatch = useMatch("/tool/:id/board");
  const ChatMatch = useMatch("/tool/:id/chat");
  const FixDoc = location.pathname.includes("document/add") || location.pathname.includes("edit");
  return (
    <>
      {location.pathname.includes("tool") && !FixDoc && !ChatMatch && (
        <nav style={{ boxShadow: "0 0 10px 5px rgb(0, 0, 0, 0.1" }} className="hidden w-full h-[70px] fixed bottom-0 pb-1 sm:flex justify-around items-center z-[1000]">
          <Link to={`/tool/${pjId}`}>
            <div
              className={`w-full h-full flex flex-col items-center space-y-2 font-semibold ${
                mainMatch ? "text-3" : "text-[#666]"
              }`}
            >
              <MHome />
              <span className="dark:text-white">메인</span>
            </div>
          </Link>
          <Link to={`/tool/${pjId}/document`}>
            <div
              className={`w-full h-full flex flex-col items-center space-y-2 font-semibold ${
                docMatch ? "text-3" : "text-[#666]"
              }`}
            >
              <MDoc />
              <span className="dark:text-white">문서</span>
            </div>
          </Link>
          <Link to={`/tool/${pjId}/board`}>
            <div
              className={`w-full h-full flex flex-col items-center space-y-2 font-semibold ${
                boardMatch ? "text-3" : "text-[#666]"
              }`}
            >
              <MBoard />
              <span className="dark:text-white">보드</span>
            </div>
          </Link>
          <Link to={`/tool/${pjId}/chat`} className="hidden md:block">
            <div
              className={`w-full h-full flex flex-col items-center space-y-2 font-semibold ${
                ChatMatch ? "text-3" : "text-[#666]"
              }`}
            >
              <MChat />
              <span className="dark:text-white">채팅</span>
            </div>
          </Link>
        </nav>
      )}
    </>
  );
};

export default Footer;
