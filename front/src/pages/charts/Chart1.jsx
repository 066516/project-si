import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SalesChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Sales data for each month
    const salesData = [
      1000, 1200, 800, 1500, 2000, 1800, 2200, 2500, 1700, 1300, 1600, 1900,
      2000, 255,
    ];

    // Labels for each month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the canvas element
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart on the canvas
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create the sales chart
    chartRef.current.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Sales in USD",

            data: salesData,
            backgroundColor: "red",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Sales in USD",
            },
          },
        },
      },
    });
  }, []);

  return (
    <div
      style={{ width: "100%" }}
      className="flex items center justify-center "
    >
      <canvas id="salesChart" ref={chartRef}></canvas>
    </div>
  );
};

export default SalesChart;
