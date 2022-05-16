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
    <div className="hidden w-full h-12 bg-green-300 fixed top-0 sm:flex justify-between items-center">
      <div className="cursor-pointer">
        <MenuIcon onClick={onClick} sx={style} />
      </div>
      <Link to="/profile">프로필</Link>
    </div>
  );
};

export default Footer;
