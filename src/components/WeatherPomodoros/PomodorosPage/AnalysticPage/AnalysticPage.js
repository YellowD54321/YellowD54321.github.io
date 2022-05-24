import "./analysticPage.css";
import BarChart from "./Charts/BarChart";
import React, { useState } from "react";
import { FakeData } from "./FakeData";

function AnalysticPage() {
  const [timeData, setTimeData] = useState({
    labels: FakeData.map((data) => data.date),
    datasets: [
      {
        label: "Work Time",
        data: FakeData.map((data) => data.workTime),
        backgroundColor: ["lightGreen"],
        borderColor: "gray",
        borderWidth: 3,
      },
    ],
  });
  return (
    <div>
      <BarChart chartData={timeData} />
    </div>
  );
}
export default AnalysticPage;
