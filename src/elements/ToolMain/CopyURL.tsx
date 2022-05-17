import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";

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
    <div className="w-full h-full flex items-center justify-end space-x-3">
      <input
        className="w-[100px] opacity-0 pointer-events-none"
        value={inviteCode || ""}
        ref={textInput}
        readOnly
      />
      <span onClick={copy}>주소 복사</span>
    </div>
  );
};

export default CopyURL;
