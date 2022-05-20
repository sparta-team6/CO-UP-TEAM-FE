import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useRecoilState } from "recoil";
import { HandleOpen } from "../recoil/AtomsInterface";
import { SvgUser } from "../elements/Icon/SvgUser";

const style = { width: 40, height: 40, marginLeft: 1 };

const MHeader = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
    console.log("hi");
  };
  const location = useLocation();
  return (
    <>
      {location.pathname.includes("tool") ? (
        <nav className="hidden w-full h-16 fixed z-50 top-0 sm:flex justify-between items-center shadow-sm">
          <div className="cursor-pointer">
            <MenuIcon className="dark:text-white" onClick={onClick} sx={style} />
          </div>
          <Link to="/profile">
            <span className="dark:text-white">
              <SvgUser />
            </span>
          </Link>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default MHeader;
