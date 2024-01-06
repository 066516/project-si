import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function Absence({ setAbsence }) {
  const fakeSuppliers = [
    { id: 1, name: "Supplier 1" },
    { id: 2, name: "Supplier 2" },
    { id: 3, name: "Supplier 3" },
    // ... other suppliers
  ];

  // State for selected product, supplier, count, price, and payment type

  const [selectedSupplierId, setSelectedSupplierId] = useState(0);

  // Event handlers

  const handleSupplierChange = (event) => {
    setSelectedSupplierId(event.target.value);
  };

  const handleSaveAbsence = () => {
    console.log("absence created");
    // Add logic to create achat
  };
  const handleCancelsave = () => {
    console.log("absence canceled");
    setAbsence(false);
  };

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <h1 className="uppercase font-semibold">Absence Employe</h1>
        <ImCancelCircle
          onClick={() => setAbsence(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <div>
          <h1 className="text-lg text-blue2">Choose a Supplier</h1>
          <select
            value={selectedSupplierId}
            onChange={handleSupplierChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value={0}>Select a supplier</option>
            {fakeSuppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleSaveAbsence}
            >
              save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCancelsave}
            >
              Cancel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absence;
