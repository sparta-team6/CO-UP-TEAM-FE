import { ProgressBar } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { useGetProjectUser } from "../../api/UserQuery";
import { toDoState } from "../../recoil/Atoms";

const MemberChart = () => {
  const toDos = useRecoilValue(toDoState);
  const { data } = useGetProjectUser();
  const toDolen =
    toDos["to_do"].length + toDos["doing"].length + toDos["done"].length;
  const dange = Math.round((toDos["to_do"].length / toDolen) * 1000) / 10;
  const warning = Math.round((toDos["doing"].length / toDolen) * 1000) / 10;
  const success = Math.round((toDos["done"].length / toDolen) * 1000) / 10;
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
      <div className="overflow-y-auto h-48">
        {data?.data?.map((data, index) => {
          return (
            <div key={index} className="flex flex-col items-center mb-3">
              <div className="w-full flex justify-between items-center">
                <span className="text-xl font-semibold">{data.name}</span>
                <div>{`${dange}/${warning}/${success}`}</div>
              </div>
              <ProgressBar className="w-full">
                <ProgressBar className="bg-1" now={dange} />
                <ProgressBar className="bg-2" now={warning} />
                <ProgressBar className="bg-3" now={success} />
              </ProgressBar>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberChart;
