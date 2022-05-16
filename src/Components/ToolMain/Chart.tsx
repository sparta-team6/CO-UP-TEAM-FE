import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { useGetBoard } from "../../api/BoardQuery";
import { ProjectKey } from "../../recoil/Atoms";

const Chart = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { data: board } = useGetBoard(String(pjId));
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-[280px] flex items-center relative">
        <div className="w-full h-full flex flex-col justify-center items-center absolute bottom-4 font-semibold text-3xl">
          <span>{}%</span>
          <p className="text-sm">완료율</p>
        </div>
        <ReactApexChart
          type="donut"
          series={[]}
          options={{
            labels: ["대기중", "진행중", "완료"],
            colors: ["#FF7637", "#FFD33C", "#5F99FF"],
            chart: {
              type: "donut",
              height: 400,
            },
            plotOptions: {
              pie: {
                customScale: 1.1,
                donut: {
                  size: "75%",
                },
              },
            },
            legend: {
              position: "bottom",
              fontWeight: 600,
            },
            stroke: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            fill: {
              type: "gradient",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
