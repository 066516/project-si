import { useEffect, useState } from "react";
import HeaderTopsDealers from "../Comp/Headres/HeaderTopsDealers";
import DealersListeEmploye from "../Comp/Listes/DealersListeEmploye";
import DealersListeClients from "../Comp/Listes/DealersListeClients";
import DealersListeFournisseur from "../Comp/Listes/DealersListeFournisseur";

function Dealers() {
  const [typeDealres, setIdtypeDealres] = useState(1);
  useEffect(() => {
    console.log(typeDealres);
  });
  return (
    <div
      className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
    >
      <HeaderTopsDealers />
      <div className="grid grid-cols-3 mt-3 shadow-r   shadow-b  shadow-t cursor-pointer">
        <h1
          className={` text-center shadow-r  ${
            typeDealres == 1 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdtypeDealres(1);
          }}
        >
          Employe
        </h1>
        <h1
          className={` text-center shadow-r  ${
            typeDealres === 2 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdtypeDealres(2);
          }}
        >
          Fournisseur
        </h1>
        <h1
          className={` text-center shadow-r  ${
            typeDealres === 3 ? "bg-gray-200" : ""
          }    py-2 font-medium uppercase`}
          onClick={() => {
            setIdtypeDealres(3);
          }}
        >
          Client
        </h1>
      </div>
      {typeDealres == 1 && <DealersListeEmploye />}
      {typeDealres == 2 && <DealersListeFournisseur />}
      {typeDealres == 3 && <DealersListeClients />}
    </div>
  );
}

export default Dealers;
