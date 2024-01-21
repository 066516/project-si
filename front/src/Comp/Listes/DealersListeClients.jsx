import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DealersListeClients({
  setAddClient,
  setEditClient,
  setDeleteClient,
  setreglementClient,
  setClient,
  setPrintClient,
}) {
  const [clientsListe, setclientsListe] = useState([]);
  const [loading, setLaoding] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  useEffect(() => {
    const fetchVentes = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.get(
          `${apiUrl}/clients/${idShop == null ? 1 : idShop}`
        );
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setclientsListe(response.data); // Directly store the data if it's an array
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
  });
  const handleEDit = (client) => {
    setClient(client);
    setEditClient(true);
  };
  const handleDelete = (client) => {
    setClient(client);
    setDeleteClient(true);
  };
  const handlePrint = (client) => {
    setClient(client);
    setPrintClient(true);
  };
  const reglementyHandle = () => {
    setreglementClient(true);
  };
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5 text-purple">
        <h1 className="py-2 px-5 text-center  border border-purple font-bold  rounded-xl border-[2px]">
          Clients liste
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-purple rounded-xl border-[2px]">
          Add Client
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddClient(true);
            }}
          />
        </h1>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Full Name </h1>
        <h2>Adresse Client</h2>
        <h2 className="hidden md:flex justify-center">phoneNumber</h2>
        <h2 className=" ">Sold</h2>
        <h2 className="">Total Ventes with his</h2>
        <h2 className="text-red-500">Update Or delete Achat</h2>
      </div>
      <div className="h-[240px] overflow-y-scroll ">
        {clientsListe.map((client) => {
          return (
            <div
              key={client.clientId}
              className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center"
            >
              <h1
                className="font-medium text-purple cursor-pointer "
                onClick={() => handlePrint(client)}
              >
                {client.nomClient} {client.prenomClient}{" "}
              </h1>
              <h2 className="font-medium ">{client.adresseClient} </h2>
              <h2 className="hidden md:flex justify-center">
                {client.telephoneClient}{" "}
              </h2>
              <h2 className="text-red-500">{client.creditClient} DA</h2>
              <h2>-20</h2>
              <h2 className="flex justify-evenly">
                <MdEdit
                  fontSize="25px"
                  color="blue"
                  onClick={() => handleEDit(client)}
                />
                <MdDeleteForever
                  fontSize="25px"
                  color="red"
                  onClick={() => handleDelete(client)}
                />
                <GiPayMoney onClick={reglementyHandle} />
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DealersListeClients;
