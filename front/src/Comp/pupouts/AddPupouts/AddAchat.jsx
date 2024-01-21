import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function AddAchat({ setAddAchat }) {
  const [products, setProducts] = useState([]);
  const [Fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [loadingPost, setLaodingPost] = useState(true);
  // Sample data for products and suppliers
  useEffect(() => {
    console.log("Fetching ventes...");
    const fetchProducts = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/products`);
        console.log(response.data);
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
    const fetchFournisseurs = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/fournisseurs`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setFournisseurs(response.data); // Directly store the data if it's an array
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
    fetchFournisseurs();
    fetchProducts();
  }, []);
  // State for selected product, supplier, count, Amount, and payment type
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedSupplierId, setSelectedSupplierId] = useState(0);
  const [selectedTypePay, setSelectedTypePay] = useState(true);
  const [count, setCount] = useState(0);
  const [Amount, setAmount] = useState(0);
  const [prixAchat, setprixAchat] = useState(0);

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
  const handlePrixChange = (event) => {
    setprixAchat(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleTypePayChange = (event) => {
    setSelectedTypePay(event.target.value);
  };
  const handleCreateAchat = () => {
    function postData() {
      return axios
        .post("http://localhost:3000/achat", {
          id_fournisseur: selectedSupplierId,
          id_produit: selectedProductId,
          quantite_achat: count,
          montant_encaisse_achat: Amount,
          statut_paiement_achat: selectedTypePay === "Totalment" ? true : false,
          prixAchat,
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
    setAddAchat(false);
    postData();
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
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
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
            {Fournisseurs.map((supplier) => (
              <option
                key={supplier.Id_fournisseur}
                value={supplier.Id_fournisseur}
              >
                {supplier.Nom_fournisseur} {supplier.Prenom_fournisseur}
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
          <h1 className="text-lg text-blue2">Enter prix Achat</h1>
          <input
            type="number"
            placeholder="Enter prix"
            value={prixAchat}
            onChange={handlePrixChange}
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
