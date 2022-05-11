import { useRef } from "react";

type IProps = {
  ProjectURL?: number;
};

const CopyURL = ({ ProjectURL }: IProps) => {
  const textInput = useRef<any>();
  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand("copy");
  };
  return (
    <div className="w-full h-full flex items-center justify-end space-x-3">
      <span onClick={copy}>코드 복사</span>
      <input
        className="w-[100px]"
        value={ProjectURL || ""}
        ref={textInput}
        readOnly
      />
    </div>
  );
};

export default CopyURL;
