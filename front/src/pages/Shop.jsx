import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShopHeader from "../Comp/Headres/ShopHeader";
import ShopTransferes from "../Comp/Listes/ShopTransferes";
import ShopListeVentes from "../Comp/Listes/ShopListeVentes";
import AddTransfer from "../Comp/pupouts/AddPupouts/AddTransfer";
import DeleteTransfer from "../Comp/pupouts/DeletePupouts/DeleteTransfer";
import UpdateTransfer from "../Comp/pupouts/Updates/UpdateTransfer";
import UpdateVentes from "../Comp/pupouts/Updates/UpdateVentes";
import DeleteVente from "../Comp/pupouts/DeletePupouts/DeleteVente";
import AddVente from "../Comp/pupouts/AddPupouts/AddVente";
import ShopListeEmploye from "../Comp/Listes/ShopListeEmploye";
import AddEmploye from "../Comp/pupouts/AddPupouts/AddEmploye";
import UpdateEmploye from "../Comp/pupouts/Updates/UpdateEmploye";
import DeleteEmploye from "../Comp/pupouts/DeletePupouts/DeleteEmploye";
import Salary from "../Comp/pupouts/pay/Salary";
import Absence from "../Comp/pupouts/pay/Absence";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("idShop");
  const [newTransfer, setAddTransft] = useState(false);
  const [EditTransfer, setEditTransfer] = useState(false);
  const [deleteTransfer, setdeleteTransfer] = useState(false);
  const [newvente, setAddVente] = useState(false);
  const [Editvente, setEditVente] = useState(false);
  const [Deletevente, setDeleteVente] = useState(false);
  const [transfer, setTransft] = useState(null);
  const [show, setshow] = useState(1);
  const [info, setInfo] = useState({});
  const [absence, setAbsence] = useState(false);
  const [paySalary, setpaySalary] = useState(false);
  const [Employe, setEmploye] = useState(null);
  const [deleteEmploye, setDeleteEmploye] = useState(false);
  const [EditEmploye, setEditEmploye] = useState(false);
  const [newEmploye, setAddEmplye] = useState(false);

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
          <UpdateTransfer
            setEditTransfer={setEditTransfer}
            transfer={transfer}
          />
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
      {newvente && (
        <div className="w-screen h-screen">
          <AddVente setAddVente={setAddVente} />
        </div>
      )}
      {Editvente && (
        <div className="w-screen h-screen">
          <UpdateVentes setEditVente={setEditVente} info={info} />
        </div>
      )}
      {Deletevente && (
        <div className="w-screen h-screen">
          <DeleteVente setDeleteVente={setDeleteVente} info={info} />
        </div>
      )}
      {absence && (
        <div className="w-screen h-screen">
          <Absence setAbsence={setAbsence} />
        </div>
      )}
      {paySalary && (
        <div className="w-screen h-screen">
          <Salary setpaySalary={setpaySalary} />
        </div>
      )}
      {deleteEmploye && (
        <div className="w-screen h-screen">
          <DeleteEmploye setDeleteEmploye={setDeleteEmploye} />
        </div>
      )}
      {EditEmploye && (
        <div className="w-screen h-screen">
          <UpdateEmploye setEditEmploye={setEditEmploye} Employe={Employe} />
        </div>
      )}
      {newEmploye && (
        <div className="w-screen h-screen">
          <AddEmploye setAddEmplye={setAddEmplye} />
        </div>
      )}
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <ShopHeader idShop={idShop} />
        <div className="grid grid-cols-3 mt-3 shadow-r   shadow-b  shadow-t cursor-pointer">
          <h1
            className={` text-center shadow-r  ${
              show == 1 ? "bg-gray-200" : ""
            }    py-2 font-medium uppercase`}
            onClick={() => {
              setshow(1);
            }}
          >
            liste transferts
          </h1>
          <h1
            className={` text-center shadow-r  ${
              show === 2 ? "bg-gray-200" : ""
            }    py-2 font-medium uppercase`}
            onClick={() => {
              setshow(2);
            }}
          >
            Liste ventes
          </h1>
          <h1
            className={` text-center shadow-r  ${
              show === 3 ? "bg-gray-200" : ""
            }    py-2 font-medium uppercase`}
            onClick={() => {
              setshow(3);
            }}
          >
            Employe liste
          </h1>
        </div>
        {show == 1 && (
          <ShopTransferes
            setAddTransft={setAddTransft}
            setdeleteTransfer={setdeleteTransfer}
            setEditTransfer={setEditTransfer}
            idShop={idShop}
          />
        )}
        {show == 2 && (
          <ShopListeVentes
            setInfo={setInfo}
            setDeleteVente={setDeleteVente}
            setEditVente={setAddVente}
            idShop={idShop}
          />
        )}
        {show == 3 && (
          <ShopListeEmploye
            setAddEmplye={setAddEmplye}
            setEditEmploye={setEditEmploye}
            setDeleteEmploye={setDeleteEmploye}
            setEmploye={setEmploye}
            setpaySalary={setpaySalary}
            setAbsence={setAbsence}
            idShop={idShop}
          />
        )}
      </div>
    </>
  );
}

export default Shop;
