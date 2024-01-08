import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { MdDeleteForever, MdEdit } from "react-icons/md";
function ShopListeVentes({ setInfo, setEditVente, setDeleteVente, idShop }) {
  const [ventesListe, setVentesListe] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    console.log("Fetching ventes...");
    const fetchVentes = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/ventes/${idShop}`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setVentesListe(response.data); // Directly store the data if it's an array
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
  }, []);

  const handleEDit = (vente) => {
    console.log(vente);
    setInfo(vente);
    setEditVente(true);
  };
  const handleDelete = (vente) => {
    console.log(vente);
    setInfo(vente);
    setDeleteVente(true);
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
        <h1 className="py-2 px-5 text-center  border border-red-500 font-bold text-red-500 rounded-xl border-[2px]">
          Liste Transfers
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500 text-red-500 rounded-xl border-[2px]">
          Search Vente
          <IoMdSearch fontSize="25px" />
        </h1>
      </div>
      <div className="grid grid-cols-6 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Produit </h1>
        <h2>Client</h2>
        <h2 className="hidden md:flex">Date</h2>
        <h2 className=" ">Count</h2>
        <h2 className="">Total Amount</h2>
        <h2>Paiment type</h2>
      </div>

      <div className="h-[240px] overflow-y-scroll ">
        {loading
          ? "loading"
          : ventesListe.map((vente) => {
              return (
                <div
                  key={vente._id}
                  className="grid md:grid-cols-7 grid-cols-5 text-center py-2 px-2 items-center"
                >
                  <h1 className="font-medium text-red-500 ">
                    {vente.productDetails.name}
                  </h1>
                  <h2 className="font-medium text-green-500">
                    {vente.clientDetails.nomClient}{" "}
                    {vente.clientDetails.prenomClient}
                  </h2>
                  <h2 className="hidden md:flex">
                    {formatDate(vente.date_vente)}
                  </h2>
                  <h2>{vente.quantite_vendue}</h2>
                  <h2>{vente.montant_total_vente} </h2>
                  {vente.statut_paiement_vente ? (
                    <h2 className="hidden md:flex">Totalment</h2>
                  ) : (
                    <h2 className="hidden md:flex">Parcielment</h2>
                  )}

                  <h2 className="flex justify-evenly">
                    <MdEdit
                      fontSize="25px"
                      color="blue"
                      onClick={() => {
                        handleEDit(vente);
                      }}
                    />
                    <MdDeleteForever
                      fontSize="25px"
                      color="red"
                      onClick={() => {
                        handleDelete(vente);
                      }}
                    />
                  </h2>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default ShopListeVentes;
