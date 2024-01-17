import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useLocation } from "react-router-dom";

function PvListe({ setEditPv, setPv, setDeletePv, setAddPv, setPrintPv }) {
  const [pvListe, setpvListe] = useState([]);
  const [loading, setLaoding] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  useEffect(() => {
    console.log("Fetching stock...");
    const fetchVentes = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(
          `${apiUrl}/pvs/${idShop == null ? 1 : parseInt(idShop)}`
        );
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setpvListe(response.data); // Directly store the data if it's an array
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
    setPv(product);
    setEditPv(true);
  };
  const handleDelete = (product) => {
    setPv(product);
    setDeletePv(true);
  };
  const handlePrint = (product) => {
    setPv(product);
    setPrintPv(true);
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
    <>
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-red-500  font-bold text-red-500  rounded-xl border-[2px]">
          Pv Liste
        </h1>
        <h1
          className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  text-red-500  rounded-xl border-[2px] "
          onClick={() => {
            setAddPv(true);
          }}
        >
          Add pv
          <IoMdAdd fontSize="25px" />
        </h1>
      </div>
      <div className="w-full text-center font-medium mt-5">
        <div className="grid md:grid-cols-3 grid-cols-3 text-center bg-gray-300 px-2 py-2 font-semibold ">
          <h1> date </h1>
          <h2 className="">content</h2>
          <h2 className="text-red-500">Update Or delete Achat</h2>
        </div>
        <div className="h-60 overflow-y-scroll">
          {loading
            ? "loading"
            : pvListe.map((pv) => {
                return (
                  <div
                    key={pv.date_pv}
                    className="grid md:grid-cols-3 grid-cols-3 text-center py-2 px-2 items-center"
                  >
                    <h1 className="font-medium text-smaoy ">
                      {formatDate(pv.date_pv)}{" "}
                    </h1>
                    <h1
                      className="font-medium text-smaoy  cursor-pointer h-20 overflow-y-scroll"
                      onClick={() => handlePrint(pv)}
                    >
                      {" "}
                      {pv.Pv_content}{" "}
                    </h1>

                    <h2 className="flex justify-evenly">
                      <MdEdit
                        fontSize="25px"
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => handleEDit(pv)}
                      />
                      <MdDeleteForever
                        fontSize="25px"
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleDelete(pv)}
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

export default PvListe;
