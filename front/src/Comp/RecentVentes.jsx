import axios from "axios";
import React, { useEffect, useState } from "react";

function RecentVentes() {
  const [loading, setLaoding] = useState(true);
  const [recentSalesShop, setRecentSalesShop] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/ventesRecente/1`);

        console.log("Expected an array, received:", response.data);
        if (Array.isArray(response.data)) {
          setRecentSalesShop(response.data); // Directly store the data if it's an array
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
      }
    };

    fetchHeadres();
  }, []);
  console.log("====================================");
  console.log(recentSalesShop);
  console.log("====================================");
  return (
    <div className="w-full text-center">
      <div className="flex justify-between font-semibold px-[2px] bg-gray-300">
        <h1>Produit </h1>
        <h2>Count</h2>
        <h2>Amount</h2>
      </div>
      <div className="w-full h-60 bg-gray-200 pr-2 overflow-y-scroll">
        <div className=" justify-between  px-2 flex text-center py-2">
          <h1 className="font-medium text-red-500">Tomato </h1>
          <h2>200Kg</h2>
          <h2>200DA</h2>
        </div>
        <div className="flex justify-between  px-2 flex text-center py-2">
          <h1 className="font-medium text-red-500">Tomato </h1>
          <h2>200Kg</h2>
          <h2>200DA</h2>
        </div>
        <div className="flex justify-between  px-2 flex text-center py-2">
          <h1 className="font-medium text-red-500">Tomato </h1>
          <h2>200Kg</h2>
          <h2>200DA</h2>
        </div>
        <div className="flex justify-between  px-2 flex text-center py-2">
          <h1 className="font-medium text-red-500">Tomato </h1>
          <h2>200Kg</h2>
          <h2>200DA</h2>
        </div>
        <div className="flex justify-between  px-2 flex text-center py-2">
          <h1 className="font-medium text-red-500">Tomato </h1>
          <h2>200Kg</h2>
          <h2>200DA</h2>
        </div>
        <div className="flex justify-between  px-2 flex text-center py-2">
          <h1 className="font-medium text-red-500">Tomato </h1>
          <h2>200Kg</h2>
          <h2>200DA</h2>
        </div>
      </div>
    </div>
  );
}

export default RecentVentes;
