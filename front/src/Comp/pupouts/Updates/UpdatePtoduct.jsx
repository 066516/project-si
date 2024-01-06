import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function UpdateProduct({ setEditPoductt, product }) {
  const [name, setName] = useState(product.name);
  const [Catogry, setCatogry] = useState(product.catogry);
  const [price, setPrice] = useState(product.price);
  const [Count, setCount] = useState(product.count);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ Catogry, name, price, Count });
    // Add logic to send this data to the server or process it as needed
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white text-blue2 relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setEditPoductt(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4">Add New Product</h1>
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
              Catogry
            </label>
            <input
              type="text"
              id="Catogry"
              value={Catogry}
              onChange={(e) => setCatogry(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor=" count" className="block mb-2">
              select a count
            </label>
            <input
              type="number"
              id=" count"
              value={Count}
              onChange={(e) => setCount(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              select a price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleSubmit}
            >
              update
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={() => {
                setEditPoductt(false);
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

export default UpdateProduct;
