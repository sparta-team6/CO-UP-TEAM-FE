import ReactJoyride from "react-joyride";

const JoyrideContainer = ({ run, steps }: any) => {
  return (
    <ReactJoyride
      run={run}
      showProgress={true}
      continuous={true}
      steps={steps}
      scrollToFirstStep={false}
      disableScrolling={true}
      disableScrollParentFix={true}
    />
  );
};

export default JoyrideContainer;
