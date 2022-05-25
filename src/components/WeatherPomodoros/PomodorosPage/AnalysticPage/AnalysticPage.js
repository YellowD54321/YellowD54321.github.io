import "./analysticPage.css";
import BarChart from "./Charts/BarChart";
import React, { useState } from "react";
import { FakeData } from "./FakeData";

function AnalysticPage() {
  const [timeData, setTimeData] = useState({
    labels: FakeData.map((data) => data.date),
    datasets: [
      {
        label: "Work Time(min)",
        data: FakeData.map((data) => data.workTime),
        backgroundColor: ["lightGreen"],
        borderColor: "gray",
        borderWidth: 3,
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState({
    plugins: {
      title: {
        display: true,
        text: "Work Time In This Week",
      },
    },
  });
  return (
    <div>
      <BarChart chartData={timeData} chartOptions={chartOptions} />
    </div>
  );
}
export default AnalysticPage;
