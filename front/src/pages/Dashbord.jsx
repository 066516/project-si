import React from "react";

function Dashbord() {
  return (
    <div
      className={` text-black  z-20 shadow-lg   top-10  relative  h-screen w-full  p-2   `}
    >
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-2">
          <div className=" border rounded-xl text-center bg-blueBg text-white py-2 font-medium uppercase ">
            <h1>Top fournisseur</h1>
            <h2> nabil gh</h2>
          </div>
          <div className=" border rounded-xl text-center bg-blueBg text-white py-2 font-medium uppercase">
            <h1>Top fournisseur</h1>
            <h2> nabil gh</h2>
          </div>
          <div className=" border rounded-xl text-center bg-blueBg text-white py-2 font-medium uppercase">
            <h1>Top fournisseur</h1>
            <h2> nabil gh</h2>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Dashbord;
