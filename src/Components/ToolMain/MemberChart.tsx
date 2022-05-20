import { ProgressBar } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { useGetManagers } from "../../api/ChartQuery";
import { ProjectKey } from "../../recoil/RoomID";
import coupFamily from "../../images/coupfamily.png";
import { useNavigate } from "react-router-dom";

const MemberChart = () => {
  const navigate = useNavigate();
  // // const { pjId } = useRecoilValue(ProjectKey);
  // const toDos = useRecoilValue(toDoState);
  // // const { data } = useGetProjectUser(String(pjId));
  // const data = useRecoilValue(MyProfile);
  // const toDolen = toDos["to_do"].length + toDos["doing"].length + toDos["done"].length;
  // const dange = Math.round((toDos["to_do"].length / toDolen) * 1000) / 10;
  // const warning = Math.round((toDos["doing"].length / toDolen) * 1000) / 10;
  // const success = Math.round((toDos["done"].length / toDolen) * 1000) / 10;
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetManagers(pjId);
  console.log(data);
  return (
    <>
      {data?.data.length === 0 ? (
        <div className="w-full h-full px-[32px] py-[28px]">
          <span className="text-2xl font-semibold sm:text-lg mb-[30px]">팀 상태 개요</span>
          <div className="flex flex-col justify-center items-center mt-[-10px]">
            <img
              className="max-w-full w-[396px] h-[177px] sm:w-[198px] sm:h-[88px]"
              src={coupFamily}
              alt=""
            />
            <span className="text-lg font-semibold my-[8px]">
              팀원들과 프로젝트 진행 상황을 공유해보세요
            </span>
            <button
              onClick={() => navigate(`/tool/${pjId}/board`)}
              className="w-[170px] h-[52px] bg-3 rounded-[4px] text-white text-xl"
            >
              보드 생성하기
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full px-[32px] py-[28px]">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold sm:text-lg mb-[30px]">팀 상태 개요</span>
            <div className="flex justify-between items-center sm:w-[150px]">
              <section className="flex items-center space-x-2 sm:space-x-1">
                <div className="w-2 h-2 rounded-full bg-5" />
                <span className="text-xs">대기</span>
              </section>
              <section className="flex items-center mx-[16px] space-x-2 sm:space-x-1">
                <div className="w-2 h-2 rounded-full bg-1" />
                <span className="text-xs">진행</span>
              </section>
              <section className="flex items-center space-x-2 sm:space-x-1">
                <div className="w-2 h-2 rounded-full bg-3" />
                <span className="text-xs">완료</span>
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
      )}
    </>
  );
};

export default MemberChart;
