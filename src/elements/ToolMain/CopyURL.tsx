import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";
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
    <div className="w-1/5 h-full flex items-center justify-end space-x-3">
      <input
        className="w-[100px] opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <div className="flex items-center text-[#666]">
        <span onClick={copy}>
          <Share2 />
        </span>
        <span className="w-10 ml-2">공유</span>
      </div>
    </div>
  );
};

export default CopyURL;
