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
    <>
      {!result ? (
        <div className="w-full h-full p-8">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold sm:text-lg">팀 상태 개요</span>
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
          <Scroll className="overflow-y-auto h-72">
            {result?.map((data, index) => {
              const a = data.buckets[0] === undefined ? 0 : data.buckets[0].cards.length;
              const b = data.buckets[1] === undefined ? 0 : data.buckets[0].cards.length;
              const c = data.buckets[2] === undefined ? 0 : data.buckets[0].cards.length;
              const sum = a + b + c;
              const dange = Math.round((a / sum) * 1000) / 10;
              const warning = Math.round((b / sum) * 1000) / 10;
              const success = Math.round((c / sum) * 1000) / 10;
              return (
                <div key={index} className="h-14 flex flex-col items-center mb-3">
                  <div className="w-full flex space-x-4">
                    <img
                      width="40px"
                      height="40px"
                      className="rounded-full"
                      src={data.profileImage}
                      alt="1"
                    />
                    <div className="w-full flex flex-col">
                      <div className="w-full flex justify-between items-end">
                        <span className="text-xl font-semibold">{data.nickname}</span>
                        <div>{`${dange}/${warning}/${success}`}</div>
                      </div>
                      <div className="w-full h-10 flex">
                        <Dange className="rounded-xl" dange={dange} />
                        <Warning className="rounded-xl mx-1" warning={warning} />
                        <Success className="rounded-xl" success={success} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Scroll>
        </div>
      )}
    </>
  );
};

export default MemberChart;

const Dange = styled.div<{ dange: number }>`
  background-color: #e7ebfe;
  height: 16px;
  width: ${(prop) => prop.dange}%;
`;

const Warning = styled.div<{ warning: number }>`
  background-color: #ff7637;
  height: 16px;
  width: ${(prop) => prop.warning}%;
`;

const Success = styled.div<{ success: number }>`
  background-color: #5f99ff;
  height: 16px;
  width: ${(prop) => prop.success}%;
`;

const Scroll = styled.ul`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;
