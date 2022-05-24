import "./charts.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <div className="bar-chart-body">
      <Bar data={chartData} />;
    </div>
  );
}
export default BarChart;
