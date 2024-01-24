import { useEffect, useState } from "react";
import RecentSales from "../Comp/RecentSales";
import RecentVentes from "../Comp/RecentVentes";
import SalesChart from "../Comp/charts/Chart1";
import PieChart from "../Comp/charts/Circule";
import LineChart from "../Comp/charts/Line";
import axios from "axios";

function Dashbord() {
  const [loading, setLaoding] = useState(true);
  const [tops, setTops] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/tops`);
        // console.log(response.data);
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
    <div
      className={` text-black   shadow-lg       h-screen w-full  lg:pr-6 lg:px-0 px-3   overflow-y-scroll md:pb-28      `}
    >
      <div className="h-full flex lg:flex-row flex-col lg:mt-20 md:mt-10 mt-16  gap-5">
        <div className="lg:w-3/4 flex flex-col justify-center ">
          <>
            {!loading && (
              <div className="grid md:grid-cols-4 gap-2">
                <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase ">
                  <h1>Top Client</h1>
                  <h2>
                    {tops.topClient.client.prenom} {tops.topClient.client.nom}
                  </h2>
                </div>
                <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase">
                  <h1>Top Employe </h1>
                  <h2> {tops.topEmployee.name}</h2>
                </div>
                <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase">
                  <h1>Top product</h1>
                  <h2> {tops.topProduct.name}</h2>
                </div>
                <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase">
                  <h1>Top Shop</h1>
                  <h2> {tops.topShop._id}</h2>
                </div>
              </div>
            )}
          </>
          <div className="w-full flex flex-col  items-center">
            <div className="flex items-center md:flex-row flex-col mt-5 md:mt-0">
              <div className="md:w-[50%] w-[100%] md:h-[200px] flex items-center">
                <PieChart />
              </div>
              <div className="w-[50%] w-full  md:h-[300px] flex items-center">
                <LineChart />
              </div>
            </div>
            <div className="md:w-[90%] w-full  flex items center justify-center  ">
              <SalesChart />
            </div>
          </div>
        </div>
        <div className="lg:w-1/4 w-full flex flex-col gap-3 lg:mt-8 rounded-3xl justify-center items-center pb-10  ">
          <div className="w-full rounded-3xl">
            <div className="bg-purple w-full py-2   text-center text-white uppercase font-bold">
              Recently purchases
            </div>
            <RecentSales />
          </div>
          <div className="w-full rounded-xl">
            <div className="bg-purple w-full py-2   text-center text-white uppercase font-bold">
              Recently sales
            </div>
            <RecentVentes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
