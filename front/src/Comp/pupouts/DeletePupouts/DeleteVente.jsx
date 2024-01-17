import axios from "axios";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function DeleteVente({ setDeleteVente, info }) {
  const [loading, setLaoding] = useState(true);

  console.log(info);
  useEffect(() => {}, []);
  const handleCancelVente = () => {
    console.log("Vente canceled");
    setDeleteVente(false);
  };
  const handleDelteVente = () => {
    const fetchVentes = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.delete(
          `${apiUrl}/ventes/${info.id_vente}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
        console.log("Fetch attempt finished");
      }
    };

    fetchVentes();
    console.log("vente deleted");
    setDeleteVente(false);
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setDeleteVente(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete vente {info.id_vente}
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleDelteVente}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelVente}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteVente;
