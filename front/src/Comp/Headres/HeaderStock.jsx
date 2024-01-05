import React from "react";

function HeaderStock() {
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <div className=" border rounded-xl text-center bg-red-500 text-white py-2 font-medium uppercase ">
        <h1>Number product Stock</h1>
        <h2> 25</h2>
      </div>
      <div className=" border rounded-xl text-center bg-red-500 text-white py-2 font-medium uppercase">
        <h1>Number unite</h1>
        <h2> 1000</h2>
      </div>
      <div className=" border rounded-xl text-center bg-red-500 text-white py-2 font-medium uppercase">
        <h1>Grand product Stock</h1>
        <h2> Tomato</h2>
      </div>
     
    </div>
  );
}

export default HeaderStock;
