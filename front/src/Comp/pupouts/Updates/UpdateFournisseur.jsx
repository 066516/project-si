import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function UpdateFournisseur({ setEditFournisseur, fournisseur }) {
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log(fournisseur);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ LastName, name, Address, phoneNumber });
    // Add logic to send this data to the server or process it as needed
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white text-blue2 relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setEditFournisseur(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4">Update Fournisseur</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-3">
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
          </div>
          <div className="mb-3">
            <label htmlFor=" Address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id=" Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleSubmit}
            >
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={() => {
                setEditFournisseur(false);
              }}
            >
              Cancel
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFournisseur;
