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

        <StockListe
          setEditPoductt={setEditPoductt}
          setDeleteProduct={setDeleteProduct}
          setProduct={setProduct}
          setAddProduct={setAddProduct}
        />
      </div>
    </>
  );
}

export default Stock;
