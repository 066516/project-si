import axios from "axios";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintVente({ setPrintVente, vente }) {
  console.log(vente);

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start  ">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%]">
        <ImCancelCircle
          onClick={() => setPrintVente(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">print vente</h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              client
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.clientDetails.nomClient} {vente.clientDetails.prenomClient}{" "}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              product
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.productDetails.name}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              prix unitaire
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.prix_unitaire_vente}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              count
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.quantite_vendue}
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
              Date vente
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.date_vente}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              montant Total
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.montant_total_vente}{" "}
            </div>
          </div>
          <div className="flex justify-end">
            <h1 className="bg-green-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase">
              send to client
            </h1>
          
          </div>
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintVente(false);
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

export default PrintVente;
