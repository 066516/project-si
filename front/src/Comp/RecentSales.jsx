import { useEffect, useState } from "react";
import axios from "axios";

function RecentSales() {
  const [loading, setLaoding] = useState(true);
  const [recentSalesShop, setRecentSalesShop] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/recentAchats`);

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
      <div className="grid grid-cols-3 font-semibold px-[2px] bg-gray-300">
        <h1>Produit </h1>
        <h2>Count</h2>
        <h2>Amount</h2>
      </div>
      <div className="w-full h-60 bg-gray-200 pr-2 overflow-y-scroll">
        {recentSalesShop.map((sale) => {
          return (
            <div
              key={sale.id_achat}
              className="w-full grid grid-cols-3 text-center  px-2 flex text-center py-2"
            >
              <h1 className="font-medium text-red-500">
                {sale.productDetails.name}
              </h1>
              <h2 className="text-center">{sale.quantite_achat}</h2>
              <h2>{sale.montant_total_achat}DA</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentSales;
