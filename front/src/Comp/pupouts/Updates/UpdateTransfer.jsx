import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useLocation } from "react-router-dom";
function UpdateTransfer({ setEditTransfer, transfer }) {
  const [products, setProducts] = useState([]);
  // Function to handle selection change
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  const fetchProducts = async () => {
    const apiUrl = "https://project-si.onrender.com";
    try {
      const response = await axios.get(`${apiUrl}/produitstocksShop/1`);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setProducts(response.data); // Directly store the data if it's an array
      } else {
        console.error("Expected an array, received:", typeof response.data);
      }
    } catch (error) {
      console.error("Error fetching ventes:", error);
    } finally {
      setLoading(false);
      console.log("Fetch attempt finished");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  // State to keep track of the selected product
  const [selectedProduct, setSelectedProduct] = useState(transfer.id_produit);
  const [count, setCount] = useState(transfer.quantite_transfert);
  // Function to handle selection change
  const [loading, setLoading] = useState(true);
  const [countinsf, setCountinsf] = useState(false);
  const handleSelectChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const handleCreateTransfert = () => {
    function postData() {
      return axios
        .put(
          `https://project-si.onrender.com/transferts/${transfer.id_transfert}`,
          {
            id_produit: selectedProduct,

            quantite_transfert: parseInt(count),
            
          }
        )
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
          // Correct usage of finally
        });
    }
    if (countinsf) {
      console.log("error");
    } else {
      setEditTransfer(false);
      postData();
    }
  };
  const handleCancelTransfert = () => {
    console.log("canceled");
    setEditTransfer(false);
  };

  var product;
  if (selectedProduct != 0 && !loading) {
    product = products.find(
      (product) => product.id_produit === parseInt(selectedProduct)
    );
    if (product && count > product.quantite_en_stock && !countinsf) {
      setCountinsf(true);
    }
    if (product && count < product.quantite_en_stock && countinsf) {
      setCountinsf(false);
    }
    console.log(product);
  }
  return (
    <div
      className="relative bg-blue2/80 z-[100]   w-screen h-screen flex
    justify-center items-start"
    >
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <h1 className="uppercase font-semibold">Update Transfer</h1>
        <ImCancelCircle
          onClick={() => {
            setEditTransfer(false);
          }}
          className=" absolute top-2 right-2 cursor-pointer "
        />
        <div>
          <h1 className="text-lg text-blue2">Choose a Product</h1>
          <select
            value={selectedProduct}
            onChange={handleSelectChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id_produit} value={product.id_produit}>
                {product.productDetails.name}
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
          {selectedProduct != 0 && (
            <>
              <div className="mb-3 uppercase">
                <label htmlFor="email" className="block text-blue2 my-2">
                  price
                </label>
                <div className="border border-gray-300 rounded p-2 w-full">
                  {product && product.productDetails.price}
                  {/* {products[selectedProduct - 1].productDetails.name} */}
                </div>
              </div>
              <div className="mb-3 uppercase">
                <label htmlFor="email" className="block text-blue2 my-2">
                  quantite in Stock
                </label>
                <div className="border border-gray-300 rounded p-2 w-full">
                  {product && product.quantite_en_stock}
                  {/* {products[selectedProduct - 1].productDetails.name} */}
                </div>
              </div>

              <div className=" text-red-500 rounded p-2 w-full">
                {product && count > product.quantite_en_stock
                  ? " Insufficient stock for transfer"
                  : ""}
              </div>
            </>
          )}
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCreateTransfert}
            >
              Update
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

export default UpdateTransfer;
