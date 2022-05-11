import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { toDoState } from "../../recoil/Atoms";

const Chart = () => {
  const toDos = useRecoilValue(toDoState);
  const toDolen =
    toDos["to_do"].length + toDos["doing"].length + toDos["done"].length;
  const success = Math.round((toDos["done"].length / toDolen) * 1000) / 10;
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full h-[280px] flex items-center relative">
        <div className="w-full h-full flex flex-col justify-center items-center absolute bottom-4 font-semibold text-3xl">
          <span>{success}%</span>
          <p className="text-sm">완료율</p>
        </div>
        <ReactApexChart
          type="donut"
          series={[
            toDos["to_do"].length,
            toDos["doing"].length,
            toDos["done"].length,
          ]}
          options={{
            labels: ["대기중", "진행중", "완료"],
            colors: ["#c0392b", "#f1c40f", "#2ecc71"],
            chart: {
              type: "donut",
              height: 400,
            },
            plotOptions: {
              pie: {
                customScale: 1,
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
