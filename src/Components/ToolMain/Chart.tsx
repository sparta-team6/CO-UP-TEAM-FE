import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { ChartLength } from "../../recoil/AtomChart";
import { themeState } from "../../recoil/DarkMode";

const Chart = () => {
  const Dark = useRecoilValue(themeState);
  const chartLength = useRecoilValue(ChartLength);
  const chartSum = chartLength.reduce((a, b) => a + b, 0);
  const chartSuccess = Math.round((chartLength[2] / chartSum) * 1000) / 10;
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-[310px] flex items-center relative dark:text-white">
        <div className="w-full h-full flex flex-col justify-center items-center absolute bottom-2">
          <div className="w-full flex justify-center items-center space-x-2">
            <span className="font-semibold text-5xl">{chartSum !== 0 ? chartSuccess : 0}</span>
            <small>%</small>
          </div>
          <p className="text-sm">완료율</p>
        </div>
        <ReactApexChart
          type="donut"
          series={chartSum === 0 ? [1] : [chartLength[0], chartLength[1], chartLength[2]]}
          options={{
            labels: chartSum === 0 ? ["보드를 추가해주세요"] : ["대기", "진행", "완료"],
            colors: chartSum === 0 ? ["#e7ebfe"] : ["#e7ebfe", "#FF7637", "#5F99FF"],
            chart: {
              type: "donut",
              height: 400,
              foreColor: Dark ? "white" : "black",
            },
            plotOptions: {
              pie: {
                customScale: 1.08,
                donut: {
                  size: "80%",
                },
              },
            },
            legend: {
              position: "bottom",
              fontWeight: 600,
            },
            stroke: {
              show: false,
              lineCap: "round",
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
