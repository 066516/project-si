import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Sales data for each category
    const salesData = [300, 500, 800, 400, 6000];
    const categories = [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ];

    // Get the canvas element
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart on the canvas
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create the pie chart
    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories,
        datasets: [
          {
            data: salesData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }, []);

  return (
    <div style={{ width: "100% " }}>
      <canvas id="pieChart" ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;
