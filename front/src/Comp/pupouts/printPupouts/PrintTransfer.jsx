import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintTransfer({ setPrintTransfer, transfer }) {
  console.log(transfer);

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start  ">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%]">
        <ImCancelCircle
          onClick={() => setPrintTransfer(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">print transfer</h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              product
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {transfer.productDetails.name}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Catogry
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {transfer.productDetails.categoryId}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Amount Total
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {transfer.cout_transfert}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              count
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {transfer.quantite_transfert}
            </div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div> */}
          <div className="mb-3 uppercase">
            <label htmlFor="email" className="block mb-2">
              Date transfer
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {transfer.date_transfert}{" "}
            </div>
          </div>

          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintTransfer(false);
              }}
            >
              close
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintTransfer;
