import loading from "../images/Lazy/Loading.gif";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen bg-[#ffffff] dark:bg-7 flex justify-center items-center">
      <img width={328} height={187} className="sm:w-[164px] sm:h-[98px]" src={loading} alt="" />
    </div>
  );
};

export default LoadingPage;
