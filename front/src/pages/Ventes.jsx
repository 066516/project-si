import { IoMdAdd } from "react-icons/io";
import HeaderTopsVente from "../Comp/Headres/HeaderTopsVente";
import { useEffect, useState } from "react";
import AddVente from "../Comp/pupouts/AddPupouts/AddVente";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import UpdateVentes from "../Comp/pupouts/Updates/UpdateVentes";
import DeleteVente from "../Comp/pupouts/DeletePupouts/DeleteVente";
import axios from "axios";
import PrintVente from "../Comp/pupouts/printPupouts/PrintVente";
function Ventes() {
  const [newvente, setAddVente] = useState(false);
  const [Editvente, setEditVente] = useState(false);
  const [deletevente, setDeleteVente] = useState(false);
  const [info, setInfo] = useState({});
  const [ventesListe, setVentesListe] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("client"); // Default search type
  const [printVente, setPrintVente] = useState(false);

  const [filteredData, setFilteredData] = useState([]); // Data to display
  useEffect(() => {
    console.log("Fetching ventes...");
    const fetchVentes = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/ventes/1`);
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
  }, [printVente, Editvente, newvente, deletevente]);

  // Use useEffect to log the ventesListe whenever it changes
  // useEffect(() => {
  //   if (ventesListe) {
  //     console.log("liste:", JSON.stringify(ventesListe, null, 2));
  //   }
  // }, [ventesListe]);
  console.log("liste", ventesListe);

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
    <>
      {newvente && (
        <div className="w-screen h-screen">
          <AddVente setAddVente={setAddVente} />
        </div>
      )}
      {Editvente && (
        <div className="w-screen h-screen">
          <UpdateVentes setEditVente={setEditVente} info={info} />
        </div>
      )}
      {deletevente && (
        <div className="w-screen h-screen">
          <DeleteVente setDeleteVente={setDeleteVente} info={info} />
        </div>
      )}
      {printVente && (
        <div className="w-screen h-screen">
          <PrintVente setPrintVente={setPrintVente} vente={info} />
        </div>
      )}
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <HeaderTopsVente />
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Ventes liste
          </h1>
          <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
            Add vente
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
        <div className="w-full text-center font-medium mt-5">
          <div className="grid md:grid-cols-7 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold ">
            <h1>Produit </h1>
            <h2>Client</h2>
            <h2 className="hidden md:flex">Date</h2>
            <h2 className=" ">Count</h2>
            <h2 className="">Total Amount</h2>
            <h2 className="hidden md:flex">Paiment type</h2>
            <h2 className="text-red-500">Update Or delete Vente</h2>
          </div>

          <div>
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
      </div>
    </>
  );
}

export default Ventes;
