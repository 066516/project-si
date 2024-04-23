import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useLocation } from "react-router-dom";

function StockListe({
  setDeleteProduct,
  setEditPoductt,
  setProduct,
  setAddProduct,
}) {
  const [StockListe, setStockListe] = useState([]);
  const [loading, setLaoding] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  useEffect(() => {
    console.log("Fetching stock...");
    const fetchVentes = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(
          `${apiUrl}/produitstocksShop/${idShop == null ? 1 : parseInt(idShop)}`
        );
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
  });
  const handleEDit = (product) => {
    setProduct(product);
    setEditPoductt(true);
  };
  const handleDelete = (product) => {
    setProduct(product);
    setDeleteProduct(true);
  };
  function downloadExcelFile() {
    fetch(
      `https://project-si.onrender.com/export/${idShop == null ? 1 : parseInt(idShop)}`
    ) // Adjust the URL as per your server configuration
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and click it to start the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `stock_center_${
          idShop == null ? 1 : parseInt(idShop)
        }.xlsx`; // Set the file name for the download
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("There was an error fetching the file: ", error);
      });
  }

  return (
    <>
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-red-500  font-bold text-red-500  rounded-xl border-[2px]">
          Stock Products Liste
        </h1>
        <h1
          className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  text-red-500  rounded-xl border-[2px] "
          onClick={() => {
            setAddProduct(true);
          }}
        >
          Add Product
          <IoMdAdd fontSize="25px" />
        </h1>
      </div>
      <div className="w-full flex justify-end mt-5">
        <h1
          className="py-2 px-5 uppercase text-center cursor-pointer flex items-center gap-1 font-bold border border-blue2  text-blue2  rounded-xl border-[2px] "
          onClick={downloadExcelFile}
        >
          download liste stock
        </h1>
      </div>

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
    </>
  );
}

export default StockListe;
