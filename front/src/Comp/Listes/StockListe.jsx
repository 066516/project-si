import axios from "axios";
import { useEffect, useState } from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function StockListe({ setDeleteProduct, setEditPoductt, setProduct }) {
  const [StockListe, setStockListe] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    console.log("Fetching stock...");
    const fetchVentes = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/produitstocksShop/1`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setStockListe(response.data); // Directly store the data if it's an array
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

    fetchVentes();
  }, );
  const handleEDit = (product) => {
    setProduct(product);
    setEditPoductt(true);
  };
  const handleDelete = (product) => {
    setProduct(product);
    setDeleteProduct(true);
  };
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="grid md:grid-cols-6 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold ">
        <h1>Product Name </h1>
        <h2 className="hidden md:flex justify-center">Catogry</h2>
        <h2>Price</h2>
        <h2>Count</h2>
        <h2 className=" ">type</h2>
        <h2 className="text-red-500">Update Or delete Achat</h2>
      </div>
      <div>
        {loading
          ? "loading"
          : StockListe.map((stock) => {
              return (
                <div
                  key={stock.stockId}
                  className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center"
                >
                  <h1 className="font-medium text-smaoy ">
                    {stock.productDetails.name}
                  </h1>
                  <h2 className="hidden md:flex justify-center">
                    {" "}
                    {stock.productDetails.categoryId}
                  </h2>
                  <h2> {stock.productDetails.price}</h2>
                  <h2>{stock.quantite_en_stock}</h2>
                  {stock.productDetails.IsRawMaterial ? (
                    <h2 className="hidden md:flex">Row Material</h2>
                  ) : (
                    <h2 className="hidden md:flex">Production</h2>
                  )}
                  <h2 className="flex justify-evenly">
                    <MdEdit
                      fontSize="25px"
                      color="blue"
                      onClick={() => handleEDit(stock)}
                    />
                    <MdDeleteForever
                      fontSize="25px"
                      color="red"
                      onClick={() => handleDelete(stock)}
                    />
                  </h2>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default StockListe;
