import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShopHeader from "../Comp/Headres/ShopHeader";
import ShopTransferes from "../Comp/Listes/ShopTransferes";
import ShopListeVentes from "../Comp/Listes/ShopListeVentes";
import AddTransfer from "../Comp/pupouts/AddPupouts/AddTransfer";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  const [Transfer, setAddTransft] = useState(false);
  useEffect(() => {
    console.log(idShop);
  });
  return (
    <>
      {Transfer && (
        <div className="w-screen h-screen">
          <AddTransfer setAddTransft={setAddTransft} />
        </div>
      )}
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <ShopHeader />
        <ShopTransferes setAddTransft={setAddTransft} />
        <ShopListeVentes />
      </div>
    </>
  );
}

export default Shop;
