import loading from "../images/Lazy/Loading.gif";

const LoadingPage = () => {
  return (
    <>
      <img width="100%" height="100%" className="absolute bg-[#ffffff] dark:bg-7" src={loading} alt="" />
    </>
  );
};

export default LoadingPage;
