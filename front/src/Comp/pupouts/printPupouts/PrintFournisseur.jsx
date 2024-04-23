import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintFournisseur({ setPrintFournisseur, fournisseur }) {
  // console.log(fournisseur);
  const [reglement, setAddReglement] = useState(false);
  const [amount, setAmount] = useState(0);
  const [reglements, setreglements] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [printreglements, setPrintReglements] = useState(false);
  useEffect(() => {}, []);
  const handleAmountChange = (event) => {
    if (event.target.value > fournisseur.solde_fournisseur) {
      setAmount(fournisseur.solde_fournisseur);
    } else setAmount(event.target.value);
  };
  const handleReglement = () => {
    function postData() {
      return axios
        .post("https://project-si.onrender.com/reglements", {
          id_fournisseur: fournisseur.Id_fournisseur,
          montant_reglement: amount,
        })
        .then((response) => {
          // Handle response here
          console.log("Data posted successfully:", response.data);
          return response.data;
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error posting data:", error);
        })
        .finally(() => {
          // setLaodingPost(false); // Correct usage of finally
        });
    }
    if (amount <= fournisseur.solde_fournisseur) {
      postData();
      setAddReglement(false);
    }
  };

  const fetchreglement = async () => {
    const apiUrl = "https://project-si.onrender.com";
    try {
      const response = await axios.get(
        `${apiUrl}/reglements/${fournisseur.Id_fournisseur}`
      );
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setreglements(response.data); // Directly store the data if it's an array
      } else {
        console.error("Expected an array, received:", typeof response.data);
      }
    } catch (error) {
      console.error("Error fetching :", error);
    } finally {
      setLaoding(false);
    }
  };

  const handlePrint = () => {
    fetchreglement();
    setPrintReglements(!printreglements);
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
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%] pb-10 ">
        <ImCancelCircle
          onClick={() => setPrintFournisseur(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">
          print fournisseur
        </h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.Nom_fournisseur} {fournisseur.Prenom_fournisseur}
            </div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div> */}
          <div className="mb-3 uppercase">
            <label htmlFor="email" className="block mb-2">
              adress
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.adresse_fournisseur}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.telephone_fournisseur}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              credit
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {fournisseur.solde_fournisseur}
            </div>
          </div>
          <div className="flex justify-between my-5">
            <h1
              className="bg-blue-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={handlePrint}
            >
              print reglements
            </h1>
            <h1
              className="bg-green-400 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => setAddReglement(!reglement)}
            >
              add reglement
            </h1>
          </div>
          {reglement && (
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2">
                entre reglement amount
              </label>
              <input
                type="number"
                value={amount}
                className="border border-gray-300 rounded p-2 w-full"
                onChange={handleAmountChange}
              />
              <h1
                className="bg-blue-500 mt-3 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
                onClick={handleReglement}
              >
                add
              </h1>
            </div>
          )}
          {printreglements && (
            <div className=" border mt-5 text-center">
              {" "}
              <div className="grid grid-cols-2 mb-2">
                <h1>Date</h1>
                <h1>amount</h1>
              </div>
              {!loading &&
                reglements.map((regl) => {
                  return (
                    <div key={regl} className="grid grid-cols-2 text-black">
                      <h1> {formatDate(regl.date_reglement)} </h1>
                      <h1>{regl.montant_reglement} </h1>
                    </div>
                  );
                })}{" "}
            </div>
          )}
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintFournisseur(false);
              }}
            >
              close
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintFournisseur;
