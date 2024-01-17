import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useLocation } from "react-router-dom";

function AddVente({ setAddVente }) {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  // State for selected product, client, count, and Amount
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedTypePay, setSelectedTypePay] = useState();
  const [loading, setLaoding] = useState(true);
  const [loadingPost, setLaodingPost] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  const [count, setCount] = useState(0);
  const [Amount, setAmount] = useState(0);
  useEffect(() => {
    console.log("Fetching ventes...");
    const fetchProducts = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/products`);
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
    const fetchClients = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(
          `${apiUrl}/clients/${idShop == null ? 1 : parseInt(idShop)}`
        );
        console.log("clients:", response.data);
        if (Array.isArray(response.data)) {
          setClients(response.data); // Directly store the data if it's an array
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
        console.log("Fetch attempt finished");
      }
    };
    fetchClients();
    fetchProducts();
  }, []);
  console.log(clients, products);
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
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleTypePayChange = (event) => {
    setSelectedTypePay(event.target.value);
  };
  const handleCreateVente = () => {
    function postData() {
      return axios
        .post("https://project-si.onrender.com/ventes", {
          id_client: selectedClientId,
          id_produit: selectedProductId,
          quantite_vendue: count,
          montant_encaisse_vente: Amount,
          id_shop: idShop == null ? 1 : parseInt(idShop),
          statut_paiement_vente: selectedTypePay === "Totalment" ? true : false,
        })
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
          setLaodingPost(false); // Correct usage of finally
        });
    }
    setAddVente(false);
    postData();
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
            {products.map((product) => (
              <option key={product.id} value={product.productId}>
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
            {clients.map((client) => (
              <option key={client.id} value={client.clientId}>
                {client.nomClient} {client.prenomClient}
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

          <h1 className="text-lg text-blue2">Enter Amount</h1>
          <input
            type="number"
            placeholder="Enter Amount"
            value={Amount}
            onChange={handleAmountChange}
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
