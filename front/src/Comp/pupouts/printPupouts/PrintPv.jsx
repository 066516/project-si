import React from "react";
import { ImCancelCircle } from "react-icons/im";

function PrintPv({ setPrintPv, pv }) {
  const handleCancelPv = () => {
    console.log("PV creation canceled");
    setPrintPv(false);
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl md:w-[70%] w-[90%]">
        <h1 className="uppercase font-semibold">print PV</h1>
        <ImCancelCircle
          onClick={() => setPrintPv(false)}
          className="absolute top-2 right-2 cursor-pointer"
        />
        <div>
          {/* Input for pv_Content */}
          <h1 className="text-lg text-blue2">PV Content</h1>
          <div className="border border-gray-300 rounded p-2 w-full">
            {pv.Pv_content}
          </div>
          {/* Other inputs similar to AddAchat if needed */}

          {/* Action buttons */}
          <div className="mt-5 flex justify-between">
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

export default PrintPv;
