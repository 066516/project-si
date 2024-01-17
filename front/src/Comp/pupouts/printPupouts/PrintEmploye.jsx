import axios from "axios";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintEmploye({ setPrintEmploye, Employe }) {
  console.log(Employe);
  const [salary, setAddSalary] = useState(false);
  const [absence, setAddAbsence] = useState(false);
  const [msrouf, setAddMasrouf] = useState(false);
  const [loading, setLaoding] = useState(true);
  const [salarys, setSalarys] = useState([]);
  const [amount, setAmount] = useState(0);

  const handlePaySalary = () => {
    function postData() {
      return axios
        .post("https://project-si.onrender.com/salaries", {
          id_employe: Employe.EmployeID,
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
    setAddSalary(false);
  };
  const handleAddAnsence = () => {
    function postData() {
      return axios
        .post("https://project-si.onrender.com/absences", {
          id_employe: Employe.EmployeID,
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
    setAddAbsence(false);
  };
  const handleAddMarouf = () => {
    function postData() {
      return axios
        .post("https://project-si.onrender.com/masroufs", {
          id_employe: Employe.EmployeID,
          montant_masrouf: amount,
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
    setAddMasrouf(false);
  };
  // const fetchSalarys = async () => {
  //   const apiUrl = "https://project-si.onrender.com";
  //   try {
  //     const response = await axios.get(
  //       `${apiUrl}/salaries/${Employe.EmployeID}`
  //     );
  //     console.log(response.data);
  //     if (Array.isArray(response.data)) {
  //       setSalarys(response.data); // Directly store the data if it's an array
  //     } else {
  //       console.error("Expected an array, received:", typeof response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching :", error);
  //   } finally {
  //     setLaoding(false);
  //   }
  // };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  // const handlePrintSalary = () => {
  //   fetchSalarys();
  // };
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
      <div className="bg-white w-[90%] md:w-2/3 text-blue2 relative top-3 p-5 rounded-xl overflow-y-scroll h-[90%] pb-10  ">
        <ImCancelCircle
          onClick={() => setPrintEmploye(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="text-lg font-semibold mb-4 uppercase">print Employee</h1>
        <div className="uppercase">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.name}{" "}
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
              Email
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.email}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.phoneNumber}{" "}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              salary
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.salary}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
            salaire Jour
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.salaireJour}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              number absence
            </label>
            <div className="border border-gray-300 rounded p-2 w-full">
              {Employe.nbAbsence}
            </div>
          </div>
          <div className="flex justify-between">
            <h1
              className="bg-green-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => setAddSalary(!salary)}
            >
              add salary
            </h1>
            <h1
              className="bg-red-400 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => setAddAbsence(!absence)}
            >
              add absence
            </h1>
            <h1
              className="bg-green-400 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => setAddMasrouf(!msrouf)}
            >
              add msrouf
            </h1>
          </div>
          {salary && (
            <div>
              <h1
                className="bg-blue-400 w-fit text-white my-3 px-5 py-2 cursor-pointer rounded-xl uppercase"
                onClick={handlePaySalary}
              >
                confirem
              </h1>{" "}
            </div>
          )}
          {absence && (
            <div>
              <h1
                className="bg-blue-400 w-fit text-white my-3 px-5 py-2 cursor-pointer rounded-xl uppercase"
                onClick={handleAddAnsence}
              >
                confirem
              </h1>{" "}
            </div>
          )}
          {msrouf && (
            <div>
              <input
                type="number"
                value={amount}
                className="border border-gray-300 rounded p-2 w-full mt-3"
                onChange={handleAmountChange}
              />
              <h1
                className="bg-blue-400 w-fit text-white my-3 px-5 py-2 cursor-pointer rounded-xl uppercase"
                onClick={handleAddMarouf}
              >
                confirem
              </h1>{" "}
            </div>
          )}
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl uppercase"
              onClick={() => {
                setPrintEmploye(false);
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

export default PrintEmploye;
