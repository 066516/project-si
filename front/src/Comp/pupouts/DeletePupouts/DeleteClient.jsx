import axios from "axios";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function DeleteClient({ setDeleteClient, client }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);
  const handleCancelClient = () => {
    console.log("Client canceled");
    setDeleteClient(false);
  };
  const handleCreateClient = () => {
    const Deleteclient = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.delete(
          `${apiUrl}/clients/${client.clientId}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLoading(false);
        console.log("Fetch attempt finished");
      }
    };

    Deleteclient();
  };
  if (!loading) {
    setDeleteClient(false);
  }
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setDeleteClient(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete Client {client.nomClient}
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCreateClient}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelClient}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteClient;
