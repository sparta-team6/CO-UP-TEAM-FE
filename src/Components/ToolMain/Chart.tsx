import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { ChartLength } from "../../recoil/AtomChart";
import { themeState } from "../../recoil/DarkMode";

const Chart = () => {
  const Dark = useRecoilValue(themeState);
  const chartLength = useRecoilValue(ChartLength);
  const chartSum = chartLength.reduce((a, b) => a + b, 0);
  const chartSuccess = Math.round((chartLength[2] / chartSum) * 100);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-[310px] flex items-center relative dark:text-white">
        <div className="w-full h-full flex flex-col justify-center items-center absolute bottom-1">
          <div className="w-full flex justify-center items-center pl-[2px]">
            <span className="font-bold text-[48px]">{chartSum !== 0 ? chartSuccess : 0}</span>
            <span className="text-[32px] pt-[7px]">%</span>
          </div>
          <span className="text-sm">완료율</span>
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
                  size: "77%",
                },
              },
            },
            legend: {
              position: "bottom",
              fontWeight: 400,
            },
            stroke: {
              show: true,
              lineCap: "round",
              width: 3,
              colors: Dark ? ["#212529"] : ["white"],
            },
            dataLabels: {
              enabled: false,
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
