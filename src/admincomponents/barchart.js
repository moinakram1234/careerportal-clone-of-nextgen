import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "applications",
        data: [851, 115, 285, 554, 251, 218, 219],
        borderColor: "#005997",
        backgroundColor: "#FFCF56",
        barThickness: 40, // Adjust the bar thickness as needed
        borderRadius: 3,   // Add border width to the bars
             // Adjust the height as needed      
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Applications",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
  });

  return (
    <div className="bh-white h-[30vh] w-full border bg-card text-card-foreground shadow p-4 md:col-span-2 lg:h-[60vh]">
      <Bar data={chartData} options={chartOptions}  />
    </div>
  );
};

export default BarChart;
