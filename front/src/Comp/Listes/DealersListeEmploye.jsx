import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever, MdOutlineSmartDisplay } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { useEffect, useState } from "react";
import axios from "axios";
function DealersListeEmploye({
  setAddEmplye,
  setDeleteEmploye,
  setEditEmploye,
  setPrintEmploye,
  setEmploye,
}) {
  const [employeListe, setemployeListe] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    console.log("Fetching ...");
    const fetchVentes = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/employes/1`);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setemployeListe(response.data); // Directly store the data if it's an array
        } else {
          console.error("Expected an array, received:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching :", error);
      } finally {
        setLaoding(false);
        console.log("Fetch attempt finished");
      }
    };

    fetchVentes();
  });

  const handleEDit = (employe) => {
    setEmploye(employe);
    setEditEmploye(true);
  };
  const handlePrint = (employe) => {
    setEmploye(employe);
    setPrintEmploye(true);
  };
  const handleDelete = (employe) => {
    setEmploye(employe);
    setDeleteEmploye(true);
  };

  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5 text-red-500">
        <h1 className="py-2 px-5 text-center  border border-red-500 font-bold  rounded-xl border-[2px]">
          Employes liste
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  rounded-xl border-[2px]">
          Add Employe
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddEmplye(true);
            }}
          />
        </h1>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-4 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Full Name </h1>
        <h2>Email</h2>
        <h2 className="hidden md:flex justify-center">phoneNumber</h2>
        <h2 className="hidden md:flex justify-center">salary</h2>
        <h2 className="">Total Absences</h2>
        <h2 className="text-red-500">Update Or delete Employe</h2>
      </div>
      <div className="h-[240px] overflow-y-scroll">
        {employeListe.map((employe) => {
          return (
            <div
              key={employe.EmployeID}
              className="grid md:grid-cols-6 grid-cols-4 text-center py-2 px-2 items-center"
            >
              <h1
                className="font-medium text-red-500 cursor-pointer"
                onClick={() => handlePrint(employe)}
              >
                {employe.name}
              </h1>
              <h2 className="font-medium "> {employe.email}</h2>
              <h2 className="hidden md:flex justify-center">
                {employe.phoneNumber}
              </h2>
              <h2 className="hidden md:flex justify-center">
                {employe.salary} DA{" "}
              </h2>
              <h2>20</h2>
              <h2 className="flex justify-evenly cursor-pointer items-center ">
                <MdEdit
                  fontSize="25px"
                  color="blue"
                  onClick={() => handleEDit(employe)}
                />
                <MdDeleteForever
                  fontSize="25px"
                  color="red"
                  onClick={() => handleDelete(employe)}
                />
                <MdOutlineSmartDisplay fontSize="25px" color="green" />
                {/* <GiPayMoney onClick={paysalaryHandle} />
                <span
                  className="font-bold text-3xl text-center  pb-3 flex items-center justify-center "
                  onClick={AbsenceHandle}
                >
                  -
                </span> */}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DealersListeEmploye;
