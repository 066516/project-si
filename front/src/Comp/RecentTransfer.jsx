import axios from "axios";
import React, { useEffect, useState } from "react";

function RecentTransfer({ idShop }) {
  const [loading, setLaoding] = useState(true);
  const [recentTransfer, setRecentTransfer] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(
          `${apiUrl}/transfertsRecente/${idShop}`
        );
        // console.log(response.data);
        // console.log("Expected an array, received:", typeof response.data);
        if (Array.isArray(response.data)) {
          setRecentTransfer(response.data); // Directly store the data if it's an array
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
    <div className="w-full text-center font-medium mb-3 ">
      <div className="grid grid-cols-3 justify-between font-semibold px-[4px] py-2  bg-gray-300">
        <h1>Produit </h1>
        <h2>Count</h2>
        <h2>Amount</h2>
      </div>
      <div className="w-full bg-gray-200 pr-2 overflow-y-scroll h-52 ">
        {recentTransfer.map((transfer) => {
          return (
            <div
              key={transfer.id_transfert}
              className="grid grid-cols-3 justify-between  px-2 flex text-center py-2"
            >
              <h1 className="font-medium text-red-500 text-center ">
                {transfer.productDetails.name}{" "}
              </h1>
              <h2>{transfer.quantite_transfert}</h2>
              <h2>{transfer.cout_transfert}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentTransfer;
