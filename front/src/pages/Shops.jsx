import { IoIosRedo } from "react-icons/io";
import RecentTransfer from "../Comp/RecentTransfer";
import RecentSalesShop from "../Comp/RecentSalesShop";
import { useEffect, useState } from "react";
import HeaderTops from "../Comp/Headres/HeaderTops";
import { Link } from "react-router-dom";
import LineChart from "../Comp/charts/Line";
import SalesChart from "../Comp/charts/Chart1";

function Shops() {
  const [idShop, setIdShop] = useState(2);
  useEffect(() => {
    console.log(idShop);
  });
  return (
    <div
      className={`  text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
    >
      <HeaderTops />
      <div className="w-full grid grid-cols-3 mt-3 shadow-r   shadow-b  shadow-t cursor-pointer">
        <h1
          className={` text-center shadow-r  ${
            idShop == 2 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdShop(2);
          }}
        >
          Shop 1
        </h1>
        <h1
          className={` text-center shadow-r  ${
            idShop === 3 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdShop(3);
          }}
        >
          Shop 2
        </h1>
        <h1
          className={` text-center shadow-r  ${
            idShop === 4 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdShop(4);
          }}
        >
          Shop 3
        </h1>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Shop {idShop - 1}
          </h1>
          <Link to={`/shop?idShop=${idShop}`}>
            <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
              See Detail Shop {idShop - 1}
              <IoIosRedo />
            </h1>
          </Link>
        </div>
        <div className=" w-full flex items-center md:flex-row flex-col  mt-5 md:mt-0">
          <div className="md:w-[50%] w-[100%] md:h-[200px] flex items-center ">
            <SalesChart idShop={idShop} />
          </div>
          <div className="w-[50%]  md:h-[300px] flex items-center justify-center ">
            <LineChart idShop={idShop} />
          </div>
        </div>
        <div className="w-full mt-5 flex gap-5 md:flex-row flex-col  px-2 md:px-0 ">
          <div className="md:w-1/2 rounded-xl w-full">
            <div className="bg-blue2  py-2   text-center text-white uppercase font-bold">
              Recently Transfer
            </div>
            <RecentTransfer idShop={idShop} />
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-red2 py-2  text-center text-white uppercase font-bold">
              Recently Sales
            </div>
            <RecentSalesShop idShop={idShop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
