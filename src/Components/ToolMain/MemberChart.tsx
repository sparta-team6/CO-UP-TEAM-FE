import { useRecoilValue } from "recoil";
import { useGetManagers } from "../../api/ChartQuery";
import { ProjectKey } from "../../recoil/RoomID";
import coupFamily from "../../images/coupfamily.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile1 from "../../images/Profile/COUP_square_대지 1.png";
import profile2 from "../../images/Profile/COUP_square-02.png";
import profile3 from "../../images/Profile/COUP_square-03.png";

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
            <img
              className="max-w-full w-[320px] h-[143px] sm:w-[198px] sm:h-[88px]"
              src={coupFamily}
              alt=""
            />
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
              const sum =
                data.buckets[0].cards.length +
                data.buckets[1].cards.length +
                data.buckets[2].cards.length;
              const dange = Math.round((data.buckets[0].cards.length / sum) * 1000) / 10;
              const warning = Math.round((data.buckets[1].cards.length / sum) * 1000) / 10;
              const success = Math.round((data.buckets[2].cards.length / sum) * 1000) / 10;
              return (
                <div key={index} className="h-14 flex flex-col items-center mb-3">
                  <div className="w-full flex space-x-4">
                    <img
                      width="40px"
                      height="40px"
                      className="rounded-full"
                      src={profile2}
                      alt="1"
                    />
                    <div className="w-full flex flex-col">
                      <div className="w-full flex justify-between items-end">
                        <span className="text-xl font-semibold">{`JIHO`}</span>
                        <div>{`${dange}/${warning}/${success}`}</div>
                      </div>
                      <div className="w-full h-10 flex space-x-1">
                        <Dange className="rounded-xl" dange={dange} />
                        <Warning className="rounded-xl" warning={warning} />
                        <Success className="rounded-xl" success={success} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="h-14 flex flex-col items-center mb-3">
              <div className="w-full flex space-x-4">
                <img width="40px" height="40px" className="rounded-full" src={profile1} alt="1" />
                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-between items-end">
                    <span className="text-xl font-semibold">{`Dog`}</span>
                    <div>{`${30}/${40}/${30}`}</div>
                  </div>
                  <div className="w-full h-10 flex space-x-1">
                    <Dange className="rounded-xl" dange={20} />
                    <Warning className="rounded-xl" warning={30} />
                    <Success className="rounded-xl" success={50} />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-14 flex flex-col items-center mb-3">
              <div className="w-full flex space-x-4">
                <img width="40px" height="40px" className="rounded-full" src={profile3} alt="1" />
                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-between items-end">
                    <span className="text-xl font-semibold">{`Cat`}</span>
                    <div>{`${30}/${40}/${30}`}</div>
                  </div>
                  <div className="w-full h-10 flex space-x-1">
                    <Dange className="rounded-xl" dange={30} />
                    <Warning className="rounded-xl" warning={20} />
                    <Success className="rounded-xl" success={50} />
                  </div>
                </div>
              </div>
            </div>
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
