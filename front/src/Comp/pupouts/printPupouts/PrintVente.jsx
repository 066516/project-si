import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintVente({ setPrintVente, vente }) {
  console.log(vente);
  const [reglement, setAddReglement] = useState(false);
  const [amount, setAmount] = useState(0);
  const [reglements, setreglements] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [printreglements, setPrintReglements] = useState(false);
  useEffect(() => {}, []);
  const handleReglement = () => {
    function postData() {
      return axios
        .post("https://project-si.onrender.com/reglementClient", {
          id_client: vente.id_client,
          id_vente: vente.id_vente,
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
    postData();
    setAddReglement(false);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const fetchreglement = async () => {
    const apiUrl = "https://project-si.onrender.com";
    try {
      const response = await axios.get(
        `${apiUrl}/reglementClient/${vente.id_vente}`
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
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate(); // Gets the day of the month (1-31)
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const year = date.getFullYear(); // Gets the year (four digits)

    // Format the date as "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  }
  const handlePrint = () => {
    fetchreglement();
    setPrintReglements(!printreglements);
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start  ">
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%]">
        <ImCancelCircle
          onClick={() => setPrintVente(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">print vente</h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              client
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.clientDetails.nomClient} {vente.clientDetails.prenomClient}{" "}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              product
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.productDetails.name}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              prix unitaire
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.prix_unitaire_vente}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              count
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.quantite_vendue}
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
              Date vente
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.date_vente}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              montant Total
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.montant_total_vente}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
           reste
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {vente.reste}{" "}
            </div>
          </div>
          <div className="flex justify-end">
            <h1 className="bg-green-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase">
              send to client
            </h1>
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
                setPrintVente(false);
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

export default PrintVente;
