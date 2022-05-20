import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";

const CopyURL = () => {
  const { inviteCode } = useRecoilValue(ProjectKey);
  const textInput = useRef<HTMLInputElement>(null);
  const copy = () => {
    const el = textInput.current;
    if (el === null) return;
    el.select();
    document.execCommand("copy");
  };
  return (
    <div className="w-1/5 h-20 flex items-end justify-end">
      <input
        className="w-[100px] opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <div className="flex text-[#666] cursor-pointer">
        <button onClick={copy} className="w-[86px] h-[39px] bg-5 rounded">
          초대코드
        </button>
      </div>
    </div>
  );
};

export default CopyURL;
