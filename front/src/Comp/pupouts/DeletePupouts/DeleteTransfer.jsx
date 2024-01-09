import axios from "axios";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function DeleteTransfer({ setdeleteTransfer, transfer }) {
  const [loading, setLaoding] = useState(true);

  // useEffect(() => {}, []);
  const handleCancelTransfer = () => {
    setdeleteTransfer(false);
    console.log("Transfer canceled");
  };
  const handleDeleteTransfer = () => {
    const Deletetransfer = async () => {
      const apiUrl = "http://localhost:3000";
      try {
        const response = await axios.delete(
          `${apiUrl}/transferts/${transfer.id_transfert}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
        console.log("Fetch attempt finished");
      }
    };

    Deletetransfer();
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setdeleteTransfer(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete this Transfer {transfer.id_transfert}
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleDeleteTransfer}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelTransfer}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteTransfer;
