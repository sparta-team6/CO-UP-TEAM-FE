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
      <div className="w-full h-full flex space-x-4 items-center">
        <img
          className="rounded-full"
          width="80px"
          height="80px"
          src={ProjectImg}
          alt=""
        />
        <div className="w-full h-full flex flex-col justify-center space-y-3">
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
