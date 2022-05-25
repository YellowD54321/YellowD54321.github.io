import "./charts.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

function BarChart({ chartData, chartOptions }) {
  return (
    <div className="bar-chart-body">
      <Bar data={chartData} options={chartOptions} />;
    </div>
  );
}
export default BarChart;
