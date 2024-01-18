import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SalesChart = () => {
  const chartRef = useRef(null);
  const [salesData, setSalesData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");

  useEffect(() => {
    const fetchSalesmontant = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(
          `${apiUrl}/analyse/totalMontantVente/${idShop == null ? 1 : idShop}`
        );
        if (Array.isArray(response.data)) {
          setSalesData(response.data);
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchSalesmontant();
  }, [idShop]);

  useEffect(() => {
    if (!chartRef.current) return;

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

    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

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
  }, [salesData]);

  return (
    <div style={{ width: "100%" }} className="flex items-center justify-center">
      <canvas id="salesChart" ref={chartRef}></canvas>
    </div>
  );
};

export default SalesChart;
