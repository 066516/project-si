import axios from "axios";
import { useEffect, useState } from "react";

function ShopHeader() {
 
  return (
    <div className="grid md:grid-cols-4 gap-2">
      <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase ">
        <h1>Top Client</h1>
        <h2> nabil ghemam</h2>
      </div>
      <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase">
        <h1>Top product</h1>
        <h2> Tomato</h2>
      </div>
      <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase">
        <h1>Total Amount Ventes </h1>
        <h2> 200000DA</h2>
      </div>
      <div className=" border rounded-xl text-center bg-blue2 text-white py-2 font-medium uppercase">
        <h1>Profit</h1>
        <h2> 2000Da</h2>
      </div>
    </div>
  );
}

export default ShopHeader;
