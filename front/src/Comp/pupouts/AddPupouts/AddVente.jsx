import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function AddVente({ setAddVente }) {
  // Sample data for products and clients
  const fakeProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    // ... other products
  ];
  const fakeClients = [
    { id: 1, name: "Client 1" },
    { id: 2, name: "Client 2" },
    { id: 3, name: "Client 3" },
    // ... other clients
  ];

  // State for selected product, client, count, and price
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedTypePay, setSelectedTypePay] = useState("");

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  // Event handlers
  const handleProductChange = (event) => {
    setSelectedProductId(event.target.value);
  };
  const handleClientChange = (event) => {
    setSelectedClientId(event.target.value);
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
  const handleCreateVente = () => {
    console.log("Vente created");
    // Add logic to create vente
  };
  const handleCancelVente = () => {
    console.log("Vente canceled");
    setAddVente(false);
  };

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <h1 className="uppercase font-semibold">New Vente</h1>
        <ImCancelCircle
          onClick={() => setAddVente(false)}
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

          <h1 className="text-lg text-blue2">Choose a Client</h1>
          <select
            value={selectedClientId}
            onChange={handleClientChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value="">Select a client</option>
            {fakeClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
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
          <h1 className="text-lg text-blue2">how you want to pay</h1>
          <select
            value={selectedTypePay}
            onChange={handleTypePayChange}
            className="rounded-xl w-60 border-blue2 border border-1 "
          >
            <option value="">Select a product</option>
            <option value="Totalment">Totalment</option>
            <option value="Parcielment">Parcielment</option>
          </select>

          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCreateVente}
            >
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCancelVente}
            >
              Cancel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVente;
