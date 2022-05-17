import MyProjectList from "../../layout/MyProjectList";
import TeamList from "../../layout/TeamList";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ChartLength, HandleOpen } from "../../recoil/Atoms";
import { useRecoilValue } from "recoil";
import { useGetBoard } from "../../api/BoardQuery";
import { ProjectKey } from "../../recoil/Atoms";
import { useEffect } from "react";

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
