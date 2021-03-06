import { useRecoilValue } from "recoil";
import { useGetManagers } from "../../api/ChartQuery";
import { ProjectKey } from "../../recoil/RoomID";
import EmptyStatus from "../../images/Main/EmptyStatus.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MemberChart = () => {
  const navigate = useNavigate();
  const { pjId } = useRecoilValue(ProjectKey);
  const { data } = useGetManagers(pjId);
  const result = data?.data;
  return (
    <div className="tutorial-main6">
      {result?.length === 0 ? (
        <div className="w-full h-full p-8">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold sm:text-lg">팀 상태 개요</span>
            <button
              onClick={() => navigate(`/tool/${pjId}/board`)}
              className="w-[118px] h-[39px] bg-3 rounded-[4px] text-white"
            >
              보드 생성하기
            </button>
          </div>
          <div className="flex flex-col justify-center items-center pt-5">
            <img className="block sm:hidden" width={320} height={144} src={EmptyStatus} alt="" />
            <img className="hidden sm:block" width={198} height={88} src={EmptyStatus} alt="" />
            <span className="text-lg mt-[21px] text-gray-400">
              팀원들과 프로젝트 진행 상황을 공유해보세요
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-[32px]">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold sm:text-lg mb-[40px]">팀 상태 개요</span>
            <div className="flex justify-between items-center mr-[5px] sm:w-[150px]">
              <section className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-5" />
                <span className="text-xs">대기</span>
              </section>
              <section className="flex items-center mx-[16px] space-x-1">
                <div className="w-2 h-2 rounded-full bg-1" />
                <span className="text-xs">진행</span>
              </section>
              <section className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-3" />
                <span className="text-xs">완료</span>
              </section>
            </div>
          </div>
          <Scroll className="overflow-y-auto h-64 -mr-[20px] pr-[20px] bg-[#ffffff] dark:bg-7">
            {result?.map((data, index) => {
              const a =
                data.buckets.filter((data) => data.position === 0)[0]?.cards.length === undefined
                  ? 0
                  : data.buckets.filter((data) => data.position === 0)[0]?.cards.length;
              const b =
                data.buckets.filter((data) => data.position === 1)[0]?.cards.length === undefined
                  ? 0
                  : data.buckets.filter((data) => data.position === 1)[0]?.cards.length;
              const c =
                data.buckets.filter((data) => data.position === 2)[0]?.cards.length === undefined
                  ? 0
                  : data.buckets.filter((data) => data.position === 2)[0]?.cards.length;
              const toDo = "대기";
              const doing = "진행";
              const done = "완료";
              const sum = a + b + c;
              const dange = Math.round((a / sum) * 1000) / 10;
              const warning = Math.round((b / sum) * 1000) / 10;
              const success = Math.round((c / sum) * 1000) / 10;
              return (
                <div key={index} className="flex flex-col items-center mb-[18px]">
                  <div className="w-full flex space-x-3">
                    <img
                      width={44}
                      height={44}
                      className="rounded-full min-w-[44px]"
                      src={data.profileImage}
                      alt="1"
                    />
                    <div className="w-full flex flex-col justify-around">
                      <div className="w-full flex justify-between items-end">
                        <span className="font-semibold">{data.nickname}</span>
                        <span className="text-sm mr-[2px]">{`${dange} / ${warning} / ${success}`}</span>
                      </div>
                      <div className="w-full flex">
                        <Dange
                          className={`rounded-xl ${!warning || (!success && "mr-[2px]")}`}
                          dange={dange}
                          title={toDo}
                        />
                        <Warning
                          className={`rounded-xl mx-[4px] ${!warning && "mx-0"} ${
                            !success && "ml-[2px] mr-0"
                          } ${!dange && "ml-0 mr-[2px]"}`}
                          warning={warning}
                          title={doing}
                        />
                        <Success
                          className={`rounded-xl ${!warning || (!dange && "ml-[2px]")}`}
                          success={success}
                          title={done}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Scroll>
        </div>
      )}
    </div>
  );
};

export default MemberChart;

const Dange = styled.div<{ dange: number; title: string }>`
  background-color: ${(prop) =>
    prop.title === "대기" ? "#e7ebfe" : prop.title === "진행" ? "#ff7637" : "#5f99ff"};
  height: 12px;
  width: ${(prop) => prop.dange}%;
`;

const Warning = styled.div<{ warning: number; title: string }>`
  background-color: ${(prop) =>
    prop.title === "대기" ? "#e7ebfe" : prop.title === "진행" ? "#ff7637" : "#5f99ff"};
  height: 12px;
  width: ${(prop) => prop.warning}%;
`;

const Success = styled.div<{ success: number; title: string }>`
  background-color: #5f99ff;
  height: 12px;
  width: ${(prop) => prop.success}%;
`;

const Scroll = styled.ul`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;
