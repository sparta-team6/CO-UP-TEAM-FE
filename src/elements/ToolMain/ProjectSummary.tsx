type IProps = {
  ProjectImg?: string;
  ProjectTitle?: string;
  ProjectSummary?: string;
};

const ProjectSummary = ({
  ProjectImg,
  ProjectTitle,
  ProjectSummary,
}: IProps) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex space-x-4 items-center sm:flex-col sm:items-start sm:space-x-0">
        <img
          className="rounded-full w-[80px] h-[80px] sm:w-[60px] sm:h-[60px]"
          src={ProjectImg}
          alt=""
        />
        <div className="w-full h-full flex flex-col justify-center space-y-3 sm:mt-2">
          <div className="w-full flex space-x-10 items-center">
            <span className="text-2xl font-semibold">{ProjectTitle}</span>
          </div>
          <span>{ProjectSummary}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
