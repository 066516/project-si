import axios from "axios";
import { useEffect, useState } from "react";

function ShopHeader({ idShop }) {
  const [loading, setLaoding] = useState(true);
  const [tops, setTops] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/analyse/tops/${idShop}`);
        // console.log(response.data);
        // console.log("Expected an array, received:", typeof response.data);
        setTops(response.data); // Directly store the data if it's an array
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
        console.log("Fetch attempt finished");
      }
    };

    if (!loading) console.log(tops);
    fetchHeadres();
  }, []);
  return (
    <>
      {!loading && (
        <div className="grid md:grid-cols-4 gap-2">
          <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase ">
            <h1>Top Client</h1>
            <h2>
              {tops.topClient.client.nom} {tops.topClient.client.prenom}
            </h2>
          </div>
          <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase">
            <h1>Top product</h1>
            <h2> {tops.topProduct.name}</h2>
          </div>
          <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase">
            <h1>Total Amount Ventes </h1>
            <h2> {tops.totalAmount}</h2>
          </div>
          <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase">
            <h1>Profit</h1>
            <h2>{tops.profit} </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopHeader;
