import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useLocation } from "react-router-dom";

function UpdatePv({ setUpdatePv, pv }) {
  const [pv_Content, setPv_Content] = useState(pv.Pv_content); // New state for pv_Content
  // ... Other state declarations (similar to AddAchat)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data if needed, similar to AddAchat
  }, []);

  // Event handlers, similar to AddAchat
  const handlePvContentChange = (event) => {
    setPv_Content(event.target.value);
  };
  const handleCreatePv = () => {
    function postData() {
      return axios
        .put(`http://localhost:3000/pvs/${pv.id_pv}`, {
          Pv_content: pv_Content,
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
          setLoading(false); // Correct usage of finally
        });
    }

    postData();
    console.log("Achat created");
    // Logic to handle the creation of a PV
    // Post data to server or handle it internally
    setUpdatePv(false);
  };
  const handleCancelPv = () => {
    console.log("PV creation canceled");
    setUpdatePv(false);
  };
  if (!loading) {
    setUpdatePv(false);
  }
  // Return JSX, similar structure to AddAchat with necessary modifications
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl md:w-[70%] w-[90%]">
        <h1 className="uppercase font-semibold">update PV</h1>
        <ImCancelCircle
          onClick={() => setUpdatePv(false)}
          className="absolute top-2 right-2 cursor-pointer"
        />
        <div>
          {/* Input for pv_Content */}
          <h1 className="text-lg text-blue2">PV Content</h1>
          <textarea
            placeholder="Enter PV content"
            value={pv_Content}
            onChange={handlePvContentChange}
            className="border-blue2 border border-1 rounded=xl"
          />
          {/* Other inputs similar to AddAchat if needed */}

          {/* Action buttons */}
          <div className="mt-5 flex justify-between">
            <h1
              className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCreatePv}
            >
              Save
            </h1>
            <h1
              className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
              onClick={handleCancelPv}
            >
              Cancel
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePv;
