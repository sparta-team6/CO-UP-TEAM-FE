import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import JoyrideContainer from "../../Components/Tutorial/JoyrideContainer";
import { mainSteps } from "../../Components/Tutorial/Steps";
import { HelpToolMain } from "../../recoil/AtomHelpCircle";
import { ProjectKey } from "../../recoil/RoomID";
import { SweetAlertHook } from "../../servers/Sweet";
import { HelpCircle } from "../Icon/HelpCircle";

const CopyURL = () => {
  const { inviteCode } = useRecoilValue(ProjectKey);
  const textInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [isHelp, setIsHelp] = useRecoilState(HelpToolMain);
  const onClick = () => {
    setOpen(true);
    setIsHelp(true);
  };
  const copy = () => {
    const el = textInput.current;
    if (el === null) return;
    el.select();
    document.execCommand("copy");
    SweetAlertHook(1000, "success", "초대코드 복사 완료😊");
  };
  return (
    <>
      <JoyrideContainer run={open} steps={mainSteps} setOpen={setOpen} />
      <div className="w-[12%] sm:w-0 h-20 flex items-end justify-end">
        <input
          className="opacity-0 pointer-events-none"
          value={inviteCode || ""}
          ref={textInput}
          readOnly
        />
        <div className="flex flex-col items-center">
          <div className={`cursor-pointer ${isHelp ? "" : "animate-bounce"}`} onClick={onClick}>
            <HelpCircle />
          </div>
          <button
            onClick={copy}
            className="tutorial-main4 w-[86px] h-[39px] bg-[#D7DCE5] dark:bg-[#323942] rounded mt-[10px]"
          >
            <span>초대코드</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CopyURL;
