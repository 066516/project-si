import axios from "axios";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintEmploye({ setPrintEmploye, Employe }) {
  console.log(Employe);

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setPrintEmploye(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">print Employee</h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.name}{" "}
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
              Email
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.email}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.phoneNumber}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              salary
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.salary}
            </div>
          </div>
          <div className="flex justify-between">
          <h1
              className="bg-green-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
             
            >
              add salary
            </h1> 
          <h1
              className="bg-red-400 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
             
            >
              add absence
            </h1> 
          <h1
              className="bg-green-400 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
             
            >
              add msrouf
            </h1> 
          </div>
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintEmploye(false);
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

export default PrintEmploye;
