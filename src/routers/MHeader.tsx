import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useRecoilState } from "recoil";
import { HandleOpen } from "../recoil/AtomsInterface";
import { SvgUser } from "../elements/Icon/SvgUser";
import { ChevronLeft } from "../elements/Icon/ChevronLeft";

const style = { width: 40, height: 40, marginLeft: 1 };

const MHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
  };
  const location = useLocation();
  const docMatch = useMatch("/tool/:id/document/:postId");
  const ChatMatch = useMatch("/tool/:id/chat");
  const FixDoc = location.pathname.includes("edit");
  return (
    <>
      {location.pathname.includes("tool") && !docMatch && !FixDoc ? (
        <nav className="hidden w-full h-16 fixed z-[70] top-0 sm:flex justify-between items-center shadow-sm px-[16px]">
          <div>
            {ChatMatch ? (
              <div onClick={() => navigate(-1)}>
                <ChevronLeft />
              </div>
            ) : (
              <MenuIcon className="dark:text-white" onClick={onClick} sx={style} />
            )}
          </div>
          <Link to="/profile">
            <div className="w-8 h-8 flex justify-center items-center rounded-full opacity-70">
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
