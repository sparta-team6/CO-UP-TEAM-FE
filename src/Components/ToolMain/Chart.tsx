import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ChartLength, ProjectKey } from "../../recoil/Atoms";

const Chart = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const chartLength = useRecoilValue(ChartLength);
  const chartSum = chartLength.reduce((a, b) => a + b);
  const chartSuccess = Math.round((chartLength[2] / chartSum) * 1000) / 10;
  return (
    <div className="w-full h-full flex justify-center">
      {chartSum === 0 ? (
        <div className="w-full h-[280px] flex items-center relative">
          <div className="w-full h-full flex flex-col justify-center items-center absolute bottom-4 font-semibold text-3xl">
            <Link to={`/tool/${pjId}/board`}>보드</Link>
          </div>
        </div>
      ) : (
        <div className="w-full h-[280px] flex items-center relative">
          <div className="w-full h-full flex flex-col justify-center items-center absolute bottom-4 font-semibold text-3xl">
            <span>{chartSum !== 0 ? chartSuccess : 0}%</span>
            <p className="text-sm">완료율</p>
          </div>
          <ReactApexChart
            type="donut"
            series={[chartLength[0], chartLength[1], chartLength[2]]}
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
      )}
    </div>
  );
};

export default Chart;
