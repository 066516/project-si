import { IoMdAdd } from "react-icons/io";
import HeaderTopsAchates from "../Comp/Headres/HeaderTopsAchates";
import { useEffect, useState } from "react";
import AddAchat from "../Comp/pupouts/AddPupouts/AddAchat";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import DeleteAchat from "../Comp/pupouts/DeletePupouts/DeleteAchat";
import UpdateAchat from "../Comp/pupouts/Updates/UpdateAchat";
import axios from "axios";

function Achates() {
  const [Achat, setAddAchat] = useState(false);
  const [Editacaht, setEditacaht] = useState(false);
  const [Deleteacaht, setDeleteacaht] = useState(false);
  const [AchatListe, setAchatListe] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLaoding] = useState(true);
  useEffect(() => {
    console.log("Fetching ventes...");
    const fetchVentes = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(`${apiUrl}/achats`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setAchatListe(response.data); // Directly store the data if it's an array
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
  console.log("====================================");
  console.log(AchatListe);
  console.log("====================================");

  const handleEDit = (achat) => {
    setInfo(achat);
    setEditacaht(true);
  };
  const handleDelete = (achat) => {
    setInfo(achat);
    setDeleteacaht(true);
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
      {Achat && (
        <div className="w-screen h-screen">
          <AddAchat setAddAchat={setAddAchat} />
        </div>
      )}
      {Editacaht && (
        <div className="w-screen h-screen">
          <UpdateAchat setEditacaht={setEditacaht} info={info} />
        </div>
      )}
      {Deleteacaht && (
        <div className="w-screen h-screen">
          <DeleteAchat setDeleteacaht={setDeleteacaht} info={info} />
        </div>
      )}
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <HeaderTopsAchates />
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Achates liste
          </h1>
          <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
            Add Achat
            <IoMdAdd
              fontSize="25px"
              onClick={() => {
                setAddAchat(true);
              }}
            />
          </h1>
        </div>

        <div className="w-full text-center font-medium mt-5">
          <div className="grid md:grid-cols-7  grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold">
            <h2>Produit</h2>
            <h2>Fournisseur</h2>
            <h2 className="hidden md:flex">Date</h2>
            <h2>Count</h2>
            <h2>Total Amount</h2>
            <h2 className="hidden md:flex">Paiment type</h2>
            <h2 className="text-red-500">Update Or delete Achat</h2>
          </div>
          {loading
            ? "loading"
            : AchatListe.map((achat) => {
                return (
                  <div
                    key={achat.id_achat}
                    className="grid  md:grid-cols-7  grid-cols-5 text-center py-2 px-2 items-center"
                  >
                    <h1 className="font-medium text-green-500">
                      {achat.productDetails.name}
                    </h1>
                    <h2 className="font-medium text-blue-500">
                      {achat.fournisseurDetails.Nom_fournisseur}{" "}
                      {achat.fournisseurDetails.Prenom_fournisseur}
                    </h2>
                    <h2 className="hidden md:block">
                      {" "}
                      {formatDate(achat.date_achat)}
                    </h2>
                    <h2>{achat.quantite_achat} </h2>
                    <h2>{achat.quantite_achat} DA</h2>
                    {achat.statut_paiement_achat ? (
                      <h2 className="hidden md:flex">Totalment</h2>
                    ) : (
                      <h2 className="hidden md:flex">Parcielment</h2>
                    )}
                    <h2 className="flex justify-evenly">
                      <MdEdit
                        fontSize="25px"
                        color="blue"
                        onClick={() => handleEDit(achat)}
                      />
                      <MdDeleteForever
                        fontSize="25px"
                        color="red"
                        onClick={() => handleDelete(achat)}
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

export default Achates;
