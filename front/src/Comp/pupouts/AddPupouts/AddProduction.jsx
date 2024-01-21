import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useLocation } from "react-router-dom";

function AddProduction({ setAddProduction }) {
  const [Catogry, setCatogry] = useState("");
  const [Count, setCount] = useState("");
  const [CountPro, setCountpro] = useState("");
  const [entreeProduit, setEntreeProduit] = useState("");
  const [productList, setProductList] = useState([]); // State for dynamic products
  const [price, setPrice] = useState("");
  const [nameProduction, setNameProduction] = useState(""); // New state for "name production"
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  useEffect(() => {
    // Replace with your API endpoint to fetch products
    const fetchProducts = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(
          `${apiUrl}/produitstocksShop/${idShop == null ? 1 : parseInt(idShop)}`
        );
        console.log("products", response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Directly store the data if it's an array
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        console.log("Fetch attempt finished");
      }
    };
    fetchProducts();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    const productData = {
      name: nameProduction,
      count: CountPro,
      price: price,
      shop: idShop == null ? 1 : parseInt(idShop),
      products: productList, // Use the dynamic productList
    };

    function postData() {
      return axios
        .post("https://project-si.onrender.com/production", productData)
        .then((response) => {
          console.log("Data posted successfully:", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }

    postData().then(() => {
      setAddProduction(false);
    });
  };

  // Function to add a new product to the list
  const addProductToList = () => {
    if (Count && entreeProduit) {
      const newProduct = {
        id_product: entreeProduit,
        count: Count,
      };
      setProductList([...productList, newProduct]);
      setCount(""); // Clear the input
      setEntreeProduit(""); // Clear the input
    }
  };

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white text-blue2 relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setAddProduction(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4">Add New Product</h1>
        <form>
          {/* New input for "name production" */}
          <div className="mb-3">
            <label htmlFor="nameProduction" className="block mb-2">
              Name Production
            </label>
            <input
              type="text"
              id="nameProduction"
              value={nameProduction}
              onChange={(e) => setNameProduction(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nameProduction" className="block mb-2">
              count Production
            </label>
            <input
              type="number"
              id="nameProduction"
              value={CountPro}
              onChange={(e) => setCountpro(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>

          {/* New input for "price production" */}
          <div className="mb-3">
            <label htmlFor="priceProduction" className="block mb-2">
              Price Production
            </label>
            <input
              type="number"
              id="priceProduction"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          {/* ...rest of your form code */}

          {/* New input for "entree produit" */}
          <div className="mb-3">
            <label htmlFor="entreeProduit" className="block mb-2">
              Entree Produit
            </label>
            <select
              id="entreeProduit"
              value={entreeProduit}
              onChange={(e) => setEntreeProduit(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            >
              <option value="">Select an Entree Produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id_produit}>
                  {product.productDetails.name}
                </option>
              ))}
            </select>
          </div>

          {/* New input for "count" */}
          <div className="mb-3">
            <label htmlFor="count" className="block mb-2">
              Count
            </label>
            <input
              type="number"
              id="count"
              value={Count}
              onChange={(e) => setCount(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>

          <button
            type="button"
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={addProductToList}
          >
            Add Product
          </button>

          {/* Display the list of added products */}
          <ul>
            {productList.map((product) => (
              <li key={product.id_product}>
                Product ID: {product.id_product}, Count: {product.count}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleSubmit}
            >
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={() => setAddProduction(false)}
            >
              Cancel
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduction;
