import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function AddEmploye({ setAddEmplye }) {
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ LastName, name, email, phoneNumber });
    // Add logic to send this data to the server or process it as needed
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white text-blue2 relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setAddEmplye(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4">Add New Employee</h1>
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
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={()=>{setAddEmplye(false)}}
            >
              Cancel
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmploye;
