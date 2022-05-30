import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import { SweetAlertHook } from "../../servers/Sweet";

const CopyURL = () => {
  const { inviteCode } = useRecoilValue(ProjectKey);
  const textInput = useRef<HTMLInputElement>(null);
  const copy = () => {
    const el = textInput.current;
    if (el === null) return;
    el.select();
    document.execCommand("copy");
    SweetAlertHook(1000, "success", "초대코드 복사 완료😊");
  };
  return (
    <div className="w-[12%] sm:w-0 h-20 flex items-end justify-end">
      <input
        className="opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <div className="flex">
        <button onClick={copy} className="w-[86px] h-[39px] bg-[#D7DCE5] dark:bg-[#323942] rounded">
          <span>초대코드</span>
        </button>
      </div>
    </div>
  );
};

export default CopyURL;
