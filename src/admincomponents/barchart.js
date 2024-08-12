import { useState, useCallback, useMemo, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import styles from "./admindashbord/dashboard.module.css";
import "react-datepicker/dist/react-datepicker.css";
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

const BarChart = ({
  refreshTrigger,
  textparentcolor,
  onRefreshComplete,
  textcolor,
  barcolor,
  graphbg,
  view = "daily",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataValues, setDataValues] = useState([]);
  const [sortedDays, setSortedDays] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Applications",
        data: [],
        borderColor: "#FFcc00",
        backgroundColor: "#FFcc00",
        barThickness: 20,
        borderRadius: 3,
      },
    ],
  });

  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 25);
    return currentDate;
  });
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const chartbardata = useMemo(
    () => ({
      labels: sortedDays,
      datasets: [
        {
          label: "Applications",
          data: dataValues,
          borderColor: barcolor,
          backgroundColor: barcolor,
          barThickness: 20,
          borderRadius: 3,
        },
      ],
    }),
    [sortedDays, dataValues, barcolor]
  );

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/nextgen?page=graph");
      const data = await response.json();

      const dayCounts = {};
      const options = { timeZone: "Asia/Karachi" };

      data.forEach((application) => {
        const createdAt = new Date(application.createdAt);
        const day = createdAt.toISOString().split("T")[0];

        if (createdAt >= startDate && createdAt <= endDate) {
          if (!dayCounts[day]) {
            dayCounts[day] = 0;
          }
          dayCounts[day]++;
        }
      });

      const sorted = Object.keys(dayCounts).sort();
      const values = sorted.map((day) => dayCounts[day]);

      setSortedDays(sorted);
      setDataValues(values);

      setIsLoading(false);
      if (onRefreshComplete) onRefreshComplete();
    } catch (error) {
      console.error("Error fetching the chart data", error);
      setIsLoading(false);
    }
  }, [barcolor, onRefreshComplete, startDate, endDate]);

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: textcolor,
          },
        },
        title: {
          display: true,
          text: "Applications",
          color: textcolor,
        },
        tooltip: {
          titleColor: "white",
          bodyColor: "white",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: textcolor,
            maxRotation: 90,
            minRotation: 45,
          },
          title: {
            display: true,
            text: "Dates",
            color: textcolor,
          },
        },
        y: {
          grid: {
            color: "rgba(0,0,0,0.1)",
          },
          ticks: {
            color: textcolor,
          },
        },
      },
    }),
    [textcolor]
  );

  return (
    <div className="h-full w-full">
      <div className="flex mb-4">
        <div className="mr-2">
          <label className="block text-sm font-medium font-spartan text-gray-700" style={{color: textparentcolor}}>
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full rounded-md p-1 font-spartan border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-spartan font-medium text-gray-700" style={{color: textparentcolor}}>
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full rounded-md p-1 border font-spartan border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={fetchData}
          className="mt-7 ml-2 pl-1 font-spartan pr-1 text-sm bg-[#ffcc00] text-white rounded-md"
        >
          Refresh Data
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[83%] rounded-md bg-[#25A2BF]">
          <span className={`${styles.loader}`}></span>
        </div>
      ) : (
        <div>
          <div
            className="h-[30vh] w-full border rounded-lg shadow p-4 md:col-span-2 lg:h-[55vh]"
            style={{ backgroundColor: graphbg }}
          >
            <Bar data={chartbardata} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
