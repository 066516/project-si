import axios from "axios";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintClient({ setPrintClient, Client }) {
  console.log(Client);
  const [reglement, setAddReglement] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleReglement = () => {
    function postData() {
      return axios
        .post("http://localhost:3000/reglements", {})
        .then((response) => {
          // Handle response here
          console.log("Data posted successfully:", response.data);
          return response.data;
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error posting data:", error);
        })
        .finally(() => {
          // setLaodingPost(false); // Correct usage of finally
        });
    }
    postData();
    setAddReglement(false);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%] pb-10 ">
        <ImCancelCircle
          onClick={() => setPrintClient(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">print Client</h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Client.nomClient} {Client.prenomClient}
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
              {Client.adresseClient}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Client.telephoneClient}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              credit
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Client.creditClient}
            </div>
          </div>
          <div className="flex justify-end">
            <h1
              className="bg-green-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => setAddReglement(!reglement)}
            >
              add reglement
            </h1>
          </div>
          {reglement && (
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2">
                entre reglement amount
              </label>
              <input
                type="number"
                value={amount}
                className="border border-gray-300 rounded p-2 w-full"
                onChange={handleAmountChange}
              />
              <h1
                className="bg-blue-500 mt-3 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
                onClick={handleReglement}
              >
                add
              </h1>
            </div>
          )}
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintClient(false);
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

export default PrintClient;
