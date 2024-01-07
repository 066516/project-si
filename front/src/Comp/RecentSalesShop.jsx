import axios from "axios";
import React, { useEffect, useState } from "react";

function RecentSalesShop({ idShop }) {
  const [loading, setLaoding] = useState(true);
  const [recentSalesShop, setRecentSalesShop] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/ventesRecente/${idShop}`);

        // console.log("Expected an array, received:", typeof response.data);
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
  }, [idShop]);
  return (
    <div className="w-full text-center font-medium mb-3">
      <div className="grid grid-cols-3 justify-between font-semibold px-[4px] py-2  bg-gray-300">
        <h1>Produit </h1>
        <h2>Count</h2>
        <h2>Amount</h2>
      </div>
      <div className="w-full  bg-gray-200 pr-2 overflow-y-scroll h-52">
        {recentSalesShop.map((sale) => {
          return (
            <div
              key={sale.id_vente}
              className="grid grid-cols-3 text-center justify-between  px-2 flex text-center py-2"
            >
              <h1 className="font-medium text-blue-500 flex text-center">
                {" "}
                {sale.productDetails.name} djafnafnanfanfjan
              </h1>
              <h2>{sale.quantite_vendue}</h2>
              <h2>{sale.montant_total_vente}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentSalesShop;
