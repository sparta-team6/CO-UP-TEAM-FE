import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/RoomID";
import { Share2 } from "../Icon/Share2";

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
    <div className="w-1/5 h-full flex items-end justify-end">
      <input
        className="w-[100px] opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <div className="flex text-[#666] cursor-pointer mb-3">
        <div className="w-20 space-x-2 flex justify-end" onClick={copy}>
          <Share2 />
          <span className="pt-[2px]">공유</span>
        </div>
      </div>
    </div>
  );
};

export default CopyURL;
