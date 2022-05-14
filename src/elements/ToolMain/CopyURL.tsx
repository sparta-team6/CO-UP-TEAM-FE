import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { ProjectKey } from "../../recoil/Atoms";

const CopyURL = () => {
  const { inviteCode } = useRecoilValue(ProjectKey);
  const textInput = useRef<any>();
  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand("copy");
  };
  return (
    <div className="w-full h-full flex items-center justify-end space-x-3">
      <span onClick={copy}>코드 복사</span>
      <input className="w-[100px]" value={inviteCode || ""} ref={textInput} readOnly />
    </div>
  );
};

export default CopyURL;
