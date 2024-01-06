import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShopHeader from "../Comp/Headres/ShopHeader";
import ShopTransferes from "../Comp/Listes/ShopTransferes";
import ShopListeVentes from "../Comp/Listes/ShopListeVentes";
import AddTransfer from "../Comp/pupouts/AddPupouts/AddTransfer";
import DeleteTransfer from "../Comp/pupouts/DeletePupouts/DeleteTransfer";
import UpdateTransfer from "../Comp/pupouts/Updates/UpdateTransfer";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  const [newTransfer, setAddTransft] = useState(false);
  const [EditTransfer, setEditTransfer] = useState(false);
  const [deleteTransfer, setdeleteTransfer] = useState(false);
  const [transfer, setTransft] = useState(null);
  useEffect(() => {
    console.log(idShop);
  });
  return (
    <>
      {newTransfer && (
        <div className="w-screen h-screen">
          <AddTransfer setAddTransft={setAddTransft} />
        </div>
      )}
      {EditTransfer && (
        <div className="w-screen h-screen">
          <UpdateTransfer setEditTransfer={setEditTransfer} transfer={transfer} />
        </div>
      )}
      {deleteTransfer && (
        <div className="w-screen h-screen">
          <DeleteTransfer
            setdeleteTransfer={setdeleteTransfer}
            transfer={transfer}
          />
        </div>
      )}
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <ShopHeader />
        <ShopTransferes
          setAddTransft={setAddTransft}
          setdeleteTransfer={setdeleteTransfer}
          setEditTransfer={setEditTransfer}
        />
        <ShopListeVentes />
      </div>
    </>
  );
}

export default Shop;
