import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

function ShopListeVentes() {
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-red-500 font-bold text-red-500 rounded-xl border-[2px]">
          Liste Transfers
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500 text-red-500 rounded-xl border-[2px]">
          Search Vente
          <IoMdSearch fontSize="25px" />
        </h1>
      </div>
      <div className="grid grid-cols-6 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Produit </h1>
        <h2>Client</h2>
        <h2 className="hidden md:flex">Date</h2>
        <h2 className=" ">Count</h2>
        <h2 className="">Total Amount</h2>
        <h2>Paiment type</h2>
      </div>
      <div className="h-[240px] overflow-y-scroll ">
        <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Tomato</h1>
          <h2 className="font-medium text-green-500">Nabil ghemam djeridi</h2>
          <h2 className="hidden md:block">25/10/2023</h2>
          <h2>20</h2>
          <h2>200DA</h2>
          <h2>Parcielment</h2>
        </div>
        <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Tomato</h1>
          <h2 className="font-medium text-green-500">Nabil ghemam djeridi</h2>
          <h2 className="hidden md:block">25/10/2023</h2>
          <h2>20</h2>
          <h2>200DA</h2>
          <h2>Parcielment</h2>
        </div>
        <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Tomato</h1>
          <h2 className="font-medium text-green-500">Nabil ghemam djeridi</h2>
          <h2 className="hidden md:block">25/10/2023</h2>
          <h2>20</h2>
          <h2>200DA</h2>
          <h2>Parcielment</h2>
        </div>
        <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Tomato</h1>
          <h2 className="font-medium text-green-500">Nabil ghemam djeridi</h2>
          <h2 className="hidden md:block">25/10/2023</h2>
          <h2>20</h2>
          <h2>200DA</h2>
          <h2>Parcielment</h2>
        </div>
        <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Tomato</h1>
          <h2 className="font-medium text-green-500">Nabil ghemam djeridi</h2>
          <h2 className="hidden md:block">25/10/2023</h2>
          <h2>20</h2>
          <h2>200DA</h2>
          <h2>Parcielment</h2>
        </div>
      </div>
    </div>
  );
}

export default ShopListeVentes;
