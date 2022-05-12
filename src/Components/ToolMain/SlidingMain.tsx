import MyProjectList from "../../layout/MyProjectList";
import TeamList from "../../layout/TeamList";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { Dispatch, SetStateAction } from "react";

interface IProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SlidingMain = ({ open, setOpen }: IProp) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex fixed top-0 left-0 mt-12 h-full">
      <div className="sm:hidden">
        <MyProjectList />
      </div>
      <div className="hidden sm:block">
        <button
          style={{
            borderRadius: "0 32px 32px 0",
          }}
          className="fixed left-0 top-[50%] w-8 h-16 bg-slate-800 text-white text-xl"
          onClick={handleOpen}
        >
          &gt;
        </button>
        <SlidingPanel type={"left"} isOpen={open} size={100}>
          <div className="flex">
            <MyProjectList />
            <TeamList />
            <button
              style={{
                borderRadius: "32px 0 0 32px",
              }}
              className="absolute top-1/2 left-[304px] w-8 h-16 bg-slate-800 text-white text-xl"
              onClick={handleClose}
            >
              &lt;
            </button>
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
