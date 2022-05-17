import { ProgressBar } from "react-bootstrap";

const MemberChart = () => {
  // // const { pjId } = useRecoilValue(ProjectKey);
  // const toDos = useRecoilValue(toDoState);
  // // const { data } = useGetProjectUser(String(pjId));
  // const data = useRecoilValue(MyProfile);
  // const toDolen = toDos["to_do"].length + toDos["doing"].length + toDos["done"].length;
  // const dange = Math.round((toDos["to_do"].length / toDolen) * 1000) / 10;
  // const warning = Math.round((toDos["doing"].length / toDolen) * 1000) / 10;
  // const success = Math.round((toDos["done"].length / toDolen) * 1000) / 10;
  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-between items-center pb-2">
        <span className="text-2xl font-semibold sm:text-lg">팀 상태 개요</span>
        <div className="w-[200px] h-full flex justify-between items-center sm:w-[150px]">
          <section className="flex items-center space-x-2 sm:space-x-1">
            <div className="w-2 h-2 rounded-full bg-1" />
            <span>대기</span>
          </section>
          <section className="flex items-center space-x-2 sm:space-x-1">
            <div className="w-2 h-2 rounded-full bg-2" />
            <span>진행중</span>
          </section>
          <section className="flex items-center space-x-2 sm:space-x-1">
            <div className="w-2 h-2 rounded-full bg-3" />
            <span>완료</span>
          </section>
        </div>
      </div>
      <div className="overflow-y-auto h-72">
        {/* {data?.data?.map((data, index) => {
          return (
            <div key={index} className="flex flex-col items-center mb-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-xl font-semibold">{data.nickname}</span>
                <div>{`${dange}/${warning}/${success}`}</div>
              </div>
              <ProgressBar className="w-full">
                <ProgressBar className="bg-1" now={dange} />
                <ProgressBar className="bg-2" now={warning} />
                <ProgressBar className="bg-3" now={success} />
              </ProgressBar>
            </div>
          );
        })} */}
        <div className="flex flex-col items-center mb-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">{`JIHO`}</span>
            <div>{`10/25/65`}</div>
          </div>
          <ProgressBar className="w-full">
            <ProgressBar className="bg-1" now={10} />
            <ProgressBar className="bg-2" now={25} />
            <ProgressBar className="bg-3" now={65} />
          </ProgressBar>
        </div>
        <div className="flex flex-col items-center mb-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">{`Charley`}</span>
            <div>{`15/35/50`}</div>
          </div>
          <ProgressBar className="w-full">
            <ProgressBar className="bg-1" now={15} />
            <ProgressBar className="bg-2" now={35} />
            <ProgressBar className="bg-3" now={50} />
          </ProgressBar>
        </div>
        <div className="flex flex-col items-center mb-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">{`Duck`}</span>
            <div>{`10/10/80`}</div>
          </div>
          <ProgressBar className="w-full">
            <ProgressBar className="bg-1" now={10} />
            <ProgressBar className="bg-2" now={10} />
            <ProgressBar className="bg-3" now={80} />
          </ProgressBar>
        </div>
      </div>
    </div>
  );
};

export default MemberChart;
