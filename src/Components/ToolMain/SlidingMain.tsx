import MyProjectList from "../../layout/MyProjectList";
import TeamList from "../../layout/TeamList";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState } from "recoil";
import { HandleOpen } from "../../recoil/Atoms";

const SlidingMain = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);
  return (
    <div className="flex fixed top-0 left-0 mt-12 h-full">
      <div className="sm:hidden">
        <MyProjectList />
      </div>
      <div className="hidden sm:block">
        <SlidingPanel type={"left"} onClose={() => setOpen(false)} isOpen={open} size={100}>
          <div className="flex">
            <MyProjectList />
            <TeamList />
          </div>
        </SlidingPanel>
      </div>
      <div className="sm:hidden">
        <TeamList />
      </div>
    </div>
  );
};

export default SlidingMain;
