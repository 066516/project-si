import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopHeader from "../Comp/Headres/ShopHeader";
import ShopTransferes from "../Comp/Listes/ShopTransferes";
import ShopListeVentes from "../Comp/Listes/ShopListeVentes";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");

  useEffect(() => {
    console.log(idShop);
  });
  return (
    <div
      className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
    >
      <ShopHeader />
      <ShopTransferes />
      <ShopListeVentes />
    </div>
  );
}

export default Shop;
