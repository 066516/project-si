import HeaderStock from "../Comp/Headres/HeaderStock";
import { IoMdAdd } from "react-icons/io";
import StockListe from "../Comp/Listes/StockListe";

function Stock() {
  return (
    <div
      className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
    >
      <HeaderStock />
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-red-500  font-bold text-red-500  rounded-xl border-[2px]">
          Stock Products Liste
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  text-red-500  rounded-xl border-[2px]">
          Add Product
          <IoMdAdd fontSize="25px" />
        </h1>
      </div>
      <StockListe />
    </div>
  );
}

export default Stock;
