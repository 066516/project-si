import axios from "axios";
import { useEffect, useState } from "react";

function HeaderStock() {
  const [loading, setLaoding] = useState(true);
  const [tops, setTops] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/produitstock/info`);
        console.log(response.data);
        // console.log("Expected an array, received:", typeof response.data);
        setTops(response.data); // Directly store the data if it's an array
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
      }
    };

    fetchHeadres();
  }, []);
  return (
    <>
      {!loading && tops.totalStats != null && (
        <div className="grid md:grid-cols-3 gap-2">
          <div className=" border rounded-xl text-center bg-red-500 text-white py-2 font-medium uppercase ">
            <h1>Number product Stock</h1>
            <h2>
              {" "}
              {tops.totalStats.totalProducts == null
                ? 0
                : tops.totalStats.totalProducts}
            </h2>
          </div>
          <div className=" border rounded-xl text-center bg-red-500 text-white py-2 font-medium uppercase">
            <h1>Number unite</h1>
            <h2>
              {" "}
              {tops.totalStats.totalUnits == null
                ? 0
                : tops.totalStats.totalUnits}
            </h2>
          </div>
          <div className=" border rounded-xl text-center bg-red-500 text-white py-2 font-medium uppercase">
            <h1>Grand product Stock</h1>
            <h2>
              {" "}
              {tops.topProduct.productDetails.name != null
                ? tops.topProduct.productDetails.name
                : null}
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderStock;
