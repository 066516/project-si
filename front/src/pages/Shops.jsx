import { IoIosRedo } from "react-icons/io";
import RecentTransfer from "../Comp/RecentTransfer";
import RecentSalesShop from "../Comp/RecentSalesShop";
import { useEffect, useState } from "react";
import HeaderTops from "../Comp/Headres/HeaderTops";
import { Link } from "react-router-dom";

function Shops() {
  const [idShop, setIdShop] = useState(1);
  useEffect(() => {
    console.log(idShop);
  });
  return (
    <div
      className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
    >
      <HeaderTops />
      <div className="grid grid-cols-3 mt-3 shadow-r   shadow-b  shadow-t cursor-pointer">
        <h1
          className={` text-center shadow-r  ${
            idShop == 1 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdShop(1);
          }}
        >
          Shop 1
        </h1>
        <h1
          className={` text-center shadow-r  ${
            idShop === 2 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdShop(2);
          }}
        >
          Shop 2
        </h1>
        <h1
          className={` text-center shadow-r  ${
            idShop === 3 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdShop(3);
          }}
        >
          Shop 3
        </h1>
      </div>
      <div>
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Shop {idShop}
          </h1>
          <Link to={`/shop?idShop=${idShop}`}>
            <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
              See Detail Shop {idShop}
              <IoIosRedo />
            </h1>
          </Link>
        </div>
        <div className="w-full mt-5 flex gap-5 md:flex-row flex-col  px-2 md:px-0 ">
          <div className="md:w-1/2 rounded-xl">
            <div className="bg-blue2  py-2   text-center text-white uppercase font-bold">
              Recently Transfer
            </div>
            <RecentTransfer idShop={idShop} />
          </div>
          <div className="md:w-1/2">
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
