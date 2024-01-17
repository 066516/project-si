import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import axios from "axios";
import { useEffect, useState } from "react";
function DealersListeFournisseur({
  setAddFournisseur,
  setDeleteFournisseur,
  setEditFournisseur,
  setfournisseur,
  setPrintFournisseur
}) {
  const [fournisseursListe, setfournisseursListe] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    const fetchVentes = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/fournisseurs`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setfournisseursListe(response.data); // Directly store the data if it's an array
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLaoding(false);
      }
    };

    fetchVentes();
  }, );
  const handleEDit = (fournisseur) => {
    setfournisseur(fournisseur);
    setEditFournisseur(true);
  };
  const handlePrint = (fournisseur) => {
    setfournisseur(fournisseur);
    setPrintFournisseur(true);
  };
  const handleDelete = (fournisseur) => {
    setfournisseur(fournisseur);

    setDeleteFournisseur(true);
  };
 
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
          Achates Fournisseur
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
          Add Fournisseur
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddFournisseur(true);
            }}
          />
        </h1>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Full Name </h1>
        <h2>Adresse Fournisseur</h2>
        <h2 className="hidden md:flex justify-center">phoneNumber</h2>
        <h2 className=" ">Sold</h2>
        <h2 className="">Total Ventes with his</h2>
        <h2 className="text-red-500">Update Or delete Employe</h2>
      </div>
      <div>
        {fournisseursListe.map((fournisseur) => {
          return (
            <div
              key={fournisseur.Id_fournisseur}
              className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center"
            >
              <h1 className="font-medium text-smaoy cursor-pointer " onClick={()=>handlePrint(fournisseur)} >
                {" "}
                {fournisseur.Nom_fournisseur} {fournisseur.Prenom_fournisseur}{" "}
              </h1>
              <h2 className="font-medium ">
                {fournisseur.adresse_fournisseur}
              </h2>
              <h2 className="hidden md:flex justify-center">
                {fournisseur.telephone_fournisseur}{" "}
              </h2>
              <h2 className="text-green-500">
                {fournisseur.solde_fournisseur}
              </h2>
              <h2>20</h2>
              <h2 className="flex justify-evenly">
                <MdEdit
                  fontSize="25px"
                  color="blue"
                  onClick={() => handleEDit(fournisseur)}
                />
                <MdDeleteForever
                  fontSize="25px"
                  color="red"
                  onClick={() => handleDelete(fournisseur)}
                />
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DealersListeFournisseur;
