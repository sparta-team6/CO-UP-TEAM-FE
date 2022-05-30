import loading from "../images/Lazy/Loading.gif";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen bg-[#ffffff] dark:bg-7 flex justify-center items-center">
      <img width={656} height={374} src={loading} alt="" />
    </div>
  );
};

export default LoadingPage;
