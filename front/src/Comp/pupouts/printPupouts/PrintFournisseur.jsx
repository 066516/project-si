import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintFournisseur({ setPrintFournisseur, fournisseur }) {
  // console.log(fournisseur);
 
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%] pb-10 ">
        <ImCancelCircle
          onClick={() => setPrintFournisseur(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">
          print fournisseur
        </h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.Nom_fournisseur} {fournisseur.Prenom_fournisseur}
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
              adress
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.adresse_fournisseur}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.telephone_fournisseur}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              credit
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.solde_fournisseur}
            </div>
          </div>
         

          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintFournisseur(false);
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

export default PrintFournisseur;
