import { useEffect, useState } from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import axios from "axios";
import { MdDeleteForever, MdEdit } from "react-icons/md";
function ShopListeVentes({
  setInfo,
  setEditVente,
  setDeleteVente,
  idShop,
  setAddVente,
  setPrintVente,
}) {
  const [ventesListe, setVentesListe] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("client"); // Default search type

  const [filteredData, setFilteredData] = useState([]); // Data to display

  useEffect(() => {
    console.log("Fetching ventes...");
    const fetchVentes = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/ventes/${idShop}`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setVentesListe(response.data);
          setFilteredData(response.data);

          // Directly store the data if it's an array
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
  }, [ventesListe.length]);

  const handleEDit = (vente) => {
    console.log(vente);
    setInfo(vente);
    setEditVente(true);
  };
  const handlePrint = (vente) => {
    console.log(vente);
    setInfo(vente);
    setPrintVente(true);
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
  const handleSearch = (searchValue, searchType) => {
    setSearchTerm(searchValue);
    let filtered;
    switch (searchType) {
      case "client":
        // Filter logic for client
        filtered = ventesListe.filter((item) =>
          `${item.clientDetails.nomClient} ${item.clientDetails.prenomClient}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
        break;
      case "product":
        // Filter logic for product
        filtered = ventesListe.filter(
          (item) =>
            item.productDetails.name
              .toLowerCase()
              .includes(searchValue.toLowerCase()) // Adjust if necessary
        );
        break;
      case "date":
        // Filter logic for date
        filtered = ventesListe.filter(
          (item) => formatDate(item.date_vente) === formatDate(searchValue) // Adjust the property to match your date format
        );
        break;
      default:
        filtered = ventesListe;
    }
    setFilteredData(filtered);
  };

  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-red-500 font-bold text-red-500 rounded-xl border-[2px]">
          Liste Transfers
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500 text-red-500 rounded-xl border-[2px]">
          Add Vente
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddVente(true);
            }}
          />
        </h1>
      </div>
      <div className="w-full flex justify-between py-3">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="rounded-xl border border-red-500 p-2"
        >
          <option value="client">Client</option>
          <option value="product">Product</option>
          <option value="date">Date</option>
        </select>
        <input
          type={searchType === "date" ? "date" : "text"}
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value, searchType)}
          className="rounded-xl border border-red-500 p-2"
        />
        {/* Render filteredData */}
      </div>

      <div className="grid grid-cols-7 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Produit </h1>
        <h2>Client</h2>
        <h2 className="hidden md:flex">Date</h2>
        <h2 className=" ">Count</h2>
        <h2 className="">Total Amount</h2>
        <h2>Paiment type</h2>
        <h2 className="text-red-500">Update Or delete Vente</h2>
      </div>

      <div className="h-[240px] overflow-y-scroll ">
        {loading
          ? "loading"
          : filteredData.map((vente) => {
              return (
                <div
                  key={vente._id}
                  className="grid md:grid-cols-7 grid-cols-5 text-center py-2 px-2 items-center"
                >
                  <h1
                    className="font-medium text-red-500 "
                    onClick={() => handlePrint(vente)}
                  >
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
