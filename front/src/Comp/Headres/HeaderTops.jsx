import axios from "axios";
import { useEffect, useState } from "react";

function HeaderTops() {
  const [loading, setLaoding] = useState(true);
  const [tops, setTops] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/tops`);
        // console.log(response.data);
        // console.log("Expected an array, received:", typeof response.data);
        setTops(response.data);
        console.log(response.data); // Directly store the data if it's an array
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
      {!loading && (
        <div className="grid md:grid-cols-4 gap-2">
          <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase ">
            <h1>Top Client</h1>
            <h2>
              {tops.topClient.client.prenom} {tops.topClient.client.nom}
            </h2>
          </div>
          <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase">
            <h1>Top Employe </h1>
            <h2> {tops.topEmployee.name}</h2>
          </div>
          <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase">
            <h1>Top product</h1>
            <h2> {tops.topProduct.name}</h2>
          </div>
          <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase">
            <h1>Top Shop</h1>
            <h2> {tops.topShop._id}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderTops;
