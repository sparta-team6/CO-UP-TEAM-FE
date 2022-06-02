import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { HandleOpen } from "../recoil/AtomsInterface";
import { SvgUser } from "../elements/Icon/SvgUser";
import { ChevronLeft } from "../elements/Icon/ChevronLeft";
import { Menu } from "../elements/Icon/mobile/Menu";
import { ProjectKey } from "../recoil/RoomID";

const MHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
  };
  const { title, thumbnail } = useRecoilValue(ProjectKey);
  const location = useLocation();
  const docMatch = useMatch("/tool/:id/document/:postId");
  const ChatMatch = useMatch("/tool/:id/chat");
  const HomeMatch = useMatch("/tool/:id");
  const FixDoc = location.pathname.includes("edit");
  return (
    <>
      {location.pathname.includes("tool") && !docMatch && !FixDoc ? (
        <nav className="hidden w-full h-16 fixed z-[1000] top-0 sm:flex justify-between items-center shadow-sm px-[16px]">
          <div className="flex gap-3">
            <div>
              {ChatMatch ? (
                <div onClick={() => navigate(-1)}>
                  <ChevronLeft />
                </div>
              ) : (
                <Menu onClick={onClick} />
              )}
            </div>
            {HomeMatch ? (
              ""
            ) : (
              <div className="h-full flex items-center space-x-2">
                <img width={24} height={24} className="rounded-full" src={thumbnail} alt="" />
                <span className="mt-[1px] font-semibold">{title}</span>
              </div>
            )}
          </div>
          <Link to="/profile">
            <div className="w-8 h-8 flex justify-center items-center rounded-full">
              <SvgUser />
            </div>
          </Link>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default MHeader;
