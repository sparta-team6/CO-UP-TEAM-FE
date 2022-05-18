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
    <div className="w-3/12 h-full flex items-center justify-end space-x-3">
      <input
        className="w-1 opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <span className="text-[#666]" onClick={copy}>
        <Share2 />
        <span className="ml-2 sm:hidden">공유</span>
      </span>
    </div>
  );
};

export default CopyURL;
