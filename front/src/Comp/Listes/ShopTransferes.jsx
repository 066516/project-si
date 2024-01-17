import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function ShopTransferes({
  setAddTransft,
  setEditTransfer,
  setdeleteTransfer,
  idShop,
  setTransft,
  setPrintTransfer,
}) {
  const [loading, setLaoding] = useState(true);
  const [transferts, settransferts] = useState([]);

  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/transferts/${idShop}`);
        console.log(response.data);
        // console.log("Expected an array, received:", typeof response.data);
        if (Array.isArray(response.data)) {
          settransferts(response.data); // Directly store the data if it's an array
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
      }
    };

    fetchHeadres();
  });
  const handleEDit = (transfer) => {
    setTransft(transfer);
    setEditTransfer(true);
  };
  const handlePrint = (transfer) => {
    setTransft(transfer);
    setPrintTransfer(true);
  };
  const handleDelete = (transfer) => {
    setTransft(transfer);
    setdeleteTransfer(true);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate(); // Gets the day of the month (1-31)
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const year = date.getFullYear(); // Gets the year (four digits)

    // Format the date as "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  }
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
          Liste Transfers
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
          Add Transfer
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddTransft(true);
            }}
          />
        </h1>
      </div>

      <div className="w-full text-center font-medium mt-5">
        <div className="grid md:grid-cols-6 grid-cols-4 text-center bg-gray-300 px-2 py-2 font-semibold ">
          <h1>Product Name </h1>
          <h2 className=" ">Catogry</h2>
          <h2 className="hidden md:flex justify-center">Date</h2>
          <h2>Count</h2>
          <h2 className="hidden md:flex justify-center">Total Amount</h2>
          <h2 className="text-red-500">Update Or delete Vente</h2>
        </div>
        <div className="h-[240px] overflow-y-scroll ">
          {transferts.map((transfer) => {
            return (
              <div
                key={transfer.id_transfert}
                className="grid md:grid-cols-6 grid-cols-4 text-center py-2 px-2 items-center"
              >
                <h1 className="font-medium text-smaoy " onClick={()=>handlePrint(transfer)}>
                  {transfer.productDetails.name}
                </h1>
                <h2 className="hidden md:flex justify-center">
                  {transfer.productDetails.categoryId}
                </h2>
                <h2>{formatDate(transfer.date_transfert)}</h2>
                <h2>{transfer.quantite_transfert}</h2>
                <h2 className="text-green-500 hidden md:flex justify-center">
                  {transfer.cout_transfert}
                </h2>
                <h2 className="flex justify-evenly">
                  <MdEdit
                    fontSize="25px"
                    color="blue"
                    onClick={() => handleEDit(transfer)}
                  />
                  <MdDeleteForever
                    fontSize="25px"
                    color="red"
                    onClick={() => handleDelete(transfer)}
                  />
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShopTransferes;
