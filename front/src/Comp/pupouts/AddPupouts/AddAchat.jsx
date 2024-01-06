import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function AddAchat({ setAddAchat }) {
  // Sample data for products and suppliers
  const fakeProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    // ... other products
  ];
  const fakeSuppliers = [
    { id: 1, name: "Supplier 1" },
    { id: 2, name: "Supplier 2" },
    { id: 3, name: "Supplier 3" },
    // ... other suppliers
  ];

  // State for selected product, supplier, count, price, and payment type
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [selectedTypePay, setSelectedTypePay] = useState("");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  // Event handlers
  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
  };
  const handleSupplierChange = (event) => {
    setSelectedSupplierId(event.target.value);
  };
  const handleCountChange = (event) => {
    setCount(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleTypePayChange = (event) => {
    setSelectedTypePay(event.target.value);
  };
  const handleCreateAchat = () => {
    console.log("Achat created");
    // Add logic to create achat
  };
  const handleCancelAchat = () => {
    console.log("Achat canceled");
    setAddAchat(false);
  };

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <h1 className="uppercase font-semibold">New Achat</h1>
        <ImCancelCircle
          onClick={() => setAddAchat(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <div>
          <h1 className="text-lg text-blue2">Choose a Product</h1>
          <select
            value={selectedProductId}
            onChange={handleProductChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value="">Select a product</option>
            {fakeProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <h1 className="text-lg text-blue2">Choose a Supplier</h1>
          <select
            value={selectedSupplierId}
            onChange={handleSupplierChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value="">Select a supplier</option>
            {fakeSuppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          <h1 className="text-lg text-blue2">Enter Count</h1>
          <input
            type="number"
            placeholder="Enter count"
            value={count}
            onChange={handleCountChange}
            className="border-blue2 border border-1 rounded"
          />

          <h1 className="text-lg text-blue2">Enter Price</h1>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={handlePriceChange}
            className="border-blue2 border border-1 rounded"
          />

          <h1 className="text-lg text-blue2">Payment Method</h1>
          <select
            value={selectedTypePay}
            onChange={handleTypePayChange}
            className="rounded-xl w-60 border-blue2 border border-1 "
          >
            <option value="">Select payment method</option>
            <option value="Totalment">Totalment</option>
            <option value="Parcielment">Parcielment</option>
          </select>

          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCreateAchat}
            >
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCancelAchat}
            >
              Cancel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAchat;
