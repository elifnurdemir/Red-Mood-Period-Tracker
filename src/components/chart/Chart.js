import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ chartData, chartDataInner }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const data = chartData.map((item) => ({
    label: item.keyword,
    value: item.value,
    color: item.color || (item.empty ? "transparent" : getRandomColor()),
  }));

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: true,
    cutout: "85%", // Grafik içindeki boşluk
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
        borderRadius: 100,
      },
      {
        data: chartDataInner.map((item) => item.value),
        backgroundColor: chartDataInner.map((item) => item.color),
        borderWidth: 0,
        borderRadius: 100,
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <Doughnut data={finalData} options={options} />
    </div>
  );
};

export default Chart;
