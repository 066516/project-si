import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function UpdateAchat({ setEditacaht, info }) {
  console.log("====================================");
  console.log(info);
  console.log("====================================");
  // Sample data for products and suppliers
  const [products, setProducts] = useState([]);
  const [Fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [loadingPost, setLaodingPost] = useState(true);
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
  const [selectedProductId, setSelectedProductId] = useState(info.id_produit);
  const [selectedSupplierId, setSelectedSupplierId] = useState(
    info.id_fournisseur
  );
  const [selectedTypePay, setSelectedTypePay] = useState(
    info.statut_paiement_achat ? "Totalment" : "Parcielment"
  );

  const [count, setCount] = useState(info.quantite_achat);
  const [Amount, setAmount] = useState(info.Amount);

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
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleTypePayChange = (event) => {
    setSelectedTypePay(event.target.value);
  };
  const handleUpdateAchat = () => {
    console.log("Achat created");
    function updateDate() {
      return axios
        .put(`http://localhost:3000/achats/${info.id_achat}`, {
          id_fournisseur: selectedSupplierId,
          id_produit: selectedProductId,
          quantite_achat: count,
          montant_encaisse_achat:Amount,
          statut_paiement_achat: selectedTypePay === "Totalment" ? true : false,
        })
        .then((response) => {
          console.log("Update successful:", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("Error updating date:", error);
        });
    }
    updateDate();
    setEditacaht(false);
  };
  const handleCancelAchat = () => {
    console.log("Achat canceled");
    setEditacaht(false);
  };

  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <h1 className="uppercase font-semibold">Update Achat</h1>
        <ImCancelCircle
          onClick={() => setEditacaht(false)}
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

          <h1 className="text-lg text-blue2">Choose a Supplier</h1>
          <select
            value={selectedSupplierId}
            onChange={handleSupplierChange}
            className="rounded-xl w-60 border-blue2 border border-1"
          >
            <option value="">Select a supplier</option>
            {Fournisseurs.map((supplier) => (
              <option key={supplier.id} value={supplier.Id_fournisseur}>
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
              onClick={handleUpdateAchat}
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

export default UpdateAchat;
