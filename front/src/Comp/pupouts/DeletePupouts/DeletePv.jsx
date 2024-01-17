import axios from "axios";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function DeletePv({ setDeletePv, pv }) {
  console.log(pv);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {}, []);
  const handleCancelPV = () => {
    console.log("Achat canceled");
    setDeletePv(false);
  };
  const handleDeletePv = () => {
    const DeletePv = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.delete(
          `${apiUrl}/pvs/${pv.id_pv}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
        console.log("Fetch attempt finished");
      }
    };

    DeletePv();
    console.log("pv deleted");
    setDeletePv(false);
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl md:w-[70%] w-[90%]">
        <ImCancelCircle
          onClick={() => setDeletePv(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete this pv {pv.id_pv}
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleDeletePv}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelPV}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeletePv;
