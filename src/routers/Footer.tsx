import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useRecoilState } from "recoil";
import { HandleOpen } from "../recoil/Atoms";

const style = { width: 40, height: 40, marginLeft: 1 };

const Footer = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <div className="hidden w-full h-12 fixed top-0 sm:flex justify-between items-center dark:bg-gray-900">
      <div className="cursor-pointer">
        <MenuIcon className="dark:text-white" onClick={onClick} sx={style} />
      </div>
      <Link to="/profile">
        <span className="dark:text-white">프로필</span>
      </Link>
    </div>
  );
};

export default Footer;
