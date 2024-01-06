import HeaderStock from "../Comp/Headres/HeaderStock";
import { IoMdAdd } from "react-icons/io";
import StockListe from "../Comp/Listes/StockListe";
import { useState } from "react";
import AddProduct from "../Comp/pupouts/AddPupouts/AddProduct";
import DeleteProduct from "../Comp/pupouts/DeletePupouts/DeleteProduct";
import UpdateProduct from "../Comp/pupouts/Updates/UpdatePtoduct";

function Stock() {
  const [newPoduct, setAddProduct] = useState(false);
  const [EditPoduct, setEditPoductt] = useState(false);
  const [deletePoduct, setDeleteProduct] = useState(false);
  const [product, setProduct] = useState({
    name: "toamto",
    catogry: "hh",
    count: 22,
    price: 34,
  });
  return (
    <>
      {newPoduct && (
        <div className="w-screen h-screen">
          <AddProduct setAddProduct={setAddProduct} />
        </div>
      )}
      {EditPoduct && (
        <div className="w-screen h-screen">
          <UpdateProduct setEditPoductt={setEditPoductt} product={product} />
        </div>
      )}
      {deletePoduct && (
        <div className="w-screen h-screen">
          <DeleteProduct
            setDeleteProduct={setDeleteProduct}
            product={product}
          />
        </div>
      )}

      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <HeaderStock />
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-red-500  font-bold text-red-500  rounded-xl border-[2px]">
            Stock Products Liste
          </h1>
          <h1
            className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  text-red-500  rounded-xl border-[2px] "
            onClick={() => {
              setAddProduct(true);
            }}
          >
            Add Product
            <IoMdAdd fontSize="25px" />
          </h1>
        </div>
        <StockListe
          setEditPoductt={setEditPoductt}
          setDeleteProduct={setDeleteProduct}
          setProduct={setProduct}
        />
      </div>
    </>
  );
}

export default Stock;
