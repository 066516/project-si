import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
function AddTransfer({ setAddTransft }) {
  const fakeProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    // Add more products as needed
  ];

  // State to keep track of the selected product
  const [selectedProduct, setSelectedProduct] = useState("");
  const [count, setCount] = useState(0);
  // Function to handle selection change
  const handleSelectChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  const handleCountChange = (event) => {
    setCount(event.target.value);
  };
  
  const handleCreateTransfert = () => {
    console.log("created");
  };
  const handleCancelTransfert = () => {
    console.log("canceled");
    setAddTransft(false);
  };
  console.log(selectedProduct, count);
  return (
    <div
      className="relative bg-blue2/80 z-[100]   w-screen h-screen flex
    justify-center items-start"
    >
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <h1 className="uppercase font-semibold">new Transfer</h1>
        <ImCancelCircle
          onClick={() => {
            setAddTransft(false);
          }}
          className=" absolute top-2 right-2 cursor-pointer "
        />
        <div>
          <h1 className="text-lg text-blue2">Choose a Shop</h1>
          <select
            value={selectedProduct}
            onChange={handleSelectChange}
            className="rounded-xl w-60 border-blue2 border border-1 "
          >
            <option value="">Select a product</option>
            {fakeProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <h1 className="text-lg text-blue2">Choose a Product</h1>
          <select
            value={selectedProduct}
            onChange={handleSelectChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value="">Select a product</option>
            {fakeProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <h1 className="text-lg text-blue2">Choose a Count</h1>
          <input
            type="number"
            placeholder="Enter count"
            value={count}
            onChange={handleCountChange}
            className="border-blue2 border border-1 rounded"
          />
         
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCreateTransfert}
            >
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCancelTransfert}
            >
              Cancel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransfer;
