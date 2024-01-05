import React from "react";
import { IoIosRedo } from "react-icons/io";

function Shops() {
  return (
    <div
      className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll       `}
    >
      <div className="grid md:grid-cols-4 gap-2">
        <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase ">
          <h1>Top fournisseur</h1>
          <h2> nabil gh</h2>
        </div>
        <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase">
          <h1>Top fournisseur</h1>
          <h2> nabil gh</h2>
        </div>
        <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase">
          <h1>Top fournisseur</h1>
          <h2> nabil gh</h2>
        </div>
        <div className=" border rounded-xl text-center bg-smaoy text-white py-2 font-medium uppercase">
          <h1>Top fournisseur</h1>
          <h2> nabil gh</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-3 shadow-r   shadow-b  shadow-t">
        <h1 className="  text-center shadow-r  bg-gray-200   py-2 font-medium uppercase">
          Shop 1
        </h1>
        <h1 className="  text-center shadow-r   py-3 font-medium uppercase">
          Shop 1
        </h1>
        <h1 className="  text-center  shadow-r  py-2 font-medium uppercase">
          Shop 1
        </h1>
      </div>
      <div>
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Shop 1
          </h1>
          <h1 className="py-2 px-5 text-center  flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
            See Detail Shop 1
            <IoIosRedo />
          </h1>
        </div>
        <div className="w-full mt-5">
          <div className="bg-blue2 w-1/2 py-2   text-center text-white uppercase font-bold">
            Recently Sales
          </div>
          <div className="w-1/2 text-center font-medium">
            <div className="flex justify-between font-semibold px-[2px] bg-gray-300">
              <h1>Produit </h1>
              <h2>Count</h2>
              <h2>Amount</h2>
            </div>
            <div className="w-full bg-gray-200 pr-2">
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
              <div className="flex justify-between  px-2 flex text-center py-2">
                <h1 className="font-medium text-red-500">Tomato </h1>
                <h2>200Kg</h2>
                <h2>200DA</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
