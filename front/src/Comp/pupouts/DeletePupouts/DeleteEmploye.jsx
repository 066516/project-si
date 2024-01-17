import axios from "axios";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function DeleteEmploye({ setDeleteEmploye, Employe }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);

  const handleCancelEmploye = () => {
    console.log("Employe canceled");
    setDeleteEmploye(false);
  };
  const handledeleteEmploye = () => {
    const DeleteEmploye = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.delete(
          `${apiUrl}/employe/${Employe.EmployeID}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLoading(false);
        console.log("Fetch attempt finished");
      }
    };

    DeleteEmploye();
  };
  if (!loading) {
    setDeleteEmploye(false);
  }
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setDeleteEmploye(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete Employe {Employe.name}
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handledeleteEmploye}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelEmploye}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteEmploye;
