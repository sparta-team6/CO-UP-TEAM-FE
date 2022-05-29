import MyProjectList from "../../layout/MyProjectList";
import TeamList from "../../layout/TeamList";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HandleOpen } from "../../recoil/AtomsInterface";
import { useRecoilValue } from "recoil";
import { useGetBoard } from "../../api/BoardQuery";
import { useEffect } from "react";
import { ProjectKey } from "../../recoil/RoomID";
import { ChartLength } from "../../recoil/AtomChart";

const SlidingMain = () => {
  const [open, setOpen] = useRecoilState(HandleOpen);
  const setChart = useSetRecoilState(ChartLength);
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board } = useGetBoard(String(pjId));
  useEffect(() => {
    if (board) {
      const a = board?.data.map((a) => a.cards.length);
      setChart(a);
    }
  }, [board]);
  return (
    <div className="flex fixed top-0 left-0 mt-16 h-full z-[100]">
      <div className="sm:hidden">
        <MyProjectList />
      </div>
      <div className="hidden sm:block">
        <SlidingPanel type={"left"} onClose={() => setOpen(false)} isOpen={open} size={100}>
          <div className="flex overflow-hidden">
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
