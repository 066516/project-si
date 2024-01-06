import axios from "axios";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function AddProduct({ setAddProduct }) {
  const [name, setName] = useState("");
  const [Catogry, setCatogry] = useState("");
  const [price, setPrice] = useState("");
  const [Count, setCount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    function postData() {
      return axios
        .post("http://localhost:3000/product", {
          name,
          price,
          count: Count,
          categoryId: Catogry,
          id_shop: 1,
        })
        .then((response) => {
          // Handle response here
          console.log("Data posted successfully:", response.data);
          return response.data;
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error posting data:", error);
        });
    }
    postData();
    // Add logic to send this data to the server or process it as needed
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white text-blue2 relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setAddProduct(false)}
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
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={() => {
                setAddProduct(false);
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

export default AddProduct;
