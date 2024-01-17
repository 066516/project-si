import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShopHeader from "../Comp/Headres/ShopHeader";
import ShopTransferes from "../Comp/Listes/ShopTransferes";
import ShopListeVentes from "../Comp/Listes/ShopListeVentes";
import DealersListeClients from "../Comp/Listes/DealersListeClients";
import StockListe from "../Comp/Listes/StockListe";
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
import AddClient from "../Comp/pupouts/AddPupouts/AddClient";
import DeleteClient from "../Comp/pupouts/DeletePupouts/DeleteClient";
import UpdateClient from "../Comp/pupouts/Updates/UpdateClient";
import AddProduct from "../Comp/pupouts/AddPupouts/AddProduct";
import UpdateProduct from "../Comp/pupouts/Updates/UpdatePtoduct";
import DeleteProduct from "../Comp/pupouts/DeletePupouts/DeleteProduct";
import PrintEmploye from "../Comp/pupouts/printPupouts/PrintEmploye";
import PrintClient from "../Comp/pupouts/printPupouts/PrintClient";
import PrintFournisseur from "../Comp/pupouts/printPupouts/PrintFournisseur";
import PrintVente from "../Comp/pupouts/printPupouts/PrintVente";
import PrintTransfer from "../Comp/pupouts/printPupouts/PrintTransfer";
import PvListe from "../Comp/Listes/PvListe";
import AddPv from "../Comp/pupouts/AddPupouts/AddPv";
import DeletePv from "../Comp/pupouts/DeletePupouts/DeletePv";
import PrintPv from "../Comp/pupouts/printPupouts/PrintPv";
import UpdatePv from "../Comp/pupouts/Updates/UpdatePv";

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
  const [Employe, setEmploye] = useState();
  const [deleteEmploye, setDeleteEmploye] = useState(false);
  const [EditEmploye, setEditEmploye] = useState(false);
  const [newEmploye, setAddEmplye] = useState(false);
  const [newClient, setAddClient] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);
  const [client, setClient] = useState(null);
  const [EditClient, setEditClient] = useState(false);
  const [newPoduct, setAddProduct] = useState(false);
  const [EditPoduct, setEditPoductt] = useState(false);
  const [deletePoduct, setDeleteProduct] = useState(false);
  const [printEmploye, setPrintEmploye] = useState(false);
  const [printClient, setPrintClient] = useState(false);
  const [printVente, setPrintVente] = useState(false);
  const [printTransfer, setPrintTransfer] = useState(false);
  const [newPv, setAddPv] = useState(false);
  const [editPv, setEditPv] = useState(false);
  const [deletePv, setDeletePv] = useState(false);
  const [printPv, setPrintPv] = useState(false);
  const [pv, setPv] = useState();
  const [product, setProduct] = useState({
    name: "toamto",
    catogry: "hh",
    count: 22,
    price: 34,
  });
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
          <DeleteEmploye
            setDeleteEmploye={setDeleteEmploye}
            Employe={Employe}
          />
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
      {newClient && (
        <div className="w-screen h-screen">
          <AddClient setAddClient={setAddClient} />
        </div>
      )}
      {deleteClient && (
        <div className="w-screen h-screen">
          <DeleteClient setDeleteClient={setDeleteClient} client={client} />
        </div>
      )}
      {EditClient && (
        <div className="w-screen h-screen">
          <UpdateClient setEditClient={setEditClient} client={client} />
        </div>
      )}
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
      {printEmploye && (
        <div className="w-screen h-screen">
          <PrintEmploye setPrintEmploye={setPrintEmploye} Employe={Employe} />
        </div>
      )}
      {printClient && (
        <div className="w-screen h-screen">
          <PrintClient setPrintClient={setPrintClient} Client={client} />
        </div>
      )}
      {printVente && (
        <div className="w-screen h-screen">
          <PrintVente setPrintVente={setPrintVente} vente={info} />
        </div>
      )}
      {printTransfer && (
        <div className="w-screen h-screen">
          <PrintTransfer
            setPrintTransfer={setPrintTransfer}
            transfer={transfer}
          />
        </div>
      )}
      {newPv && (
        <div className="w-screen h-screen">
          <AddPv setAddPv={setAddPv} />
        </div>
      )}
      {deletePv && (
        <div className="w-screen h-screen">
          <DeletePv setDeletePv={setDeletePv} pv={pv} />
        </div>
      )}
      {printPv && (
        <div className="w-screen h-screen">
          <PrintPv setPrintPv={setPrintPv} pv={pv} />
        </div>
      )}
      {editPv && (
        <div className="w-screen h-screen">
          <UpdatePv setUpdatePv={setEditPv} pv={pv} />
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
          <h1
            className={` text-center shadow-r  ${
              show === 4 ? "bg-gray-200" : ""
            }    py-2 font-medium uppercase`}
            onClick={() => {
              setshow(4);
            }}
          >
            Client liste
          </h1>
          <h1
            className={` text-center shadow-r  ${
              show === 5 ? "bg-gray-200" : ""
            }    py-2 font-medium uppercase`}
            onClick={() => {
              setshow(5);
            }}
          >
            stock liste
          </h1>
          <h1
            className={` text-center shadow-r  ${
              show === 6 ? "bg-gray-200" : ""
            }    py-2 font-medium uppercase`}
            onClick={() => {
              setshow(6);
            }}
          >
            pv liste
          </h1>
        </div>
        {show == 1 && (
          <ShopTransferes
            setAddTransft={setAddTransft}
            setdeleteTransfer={setdeleteTransfer}
            setEditTransfer={setEditTransfer}
            idShop={idShop}
            setTransft={setTransft}
            setPrintTransfer={setPrintTransfer}
          />
        )}
        {show == 2 && (
          <ShopListeVentes
            setInfo={setInfo}
            setDeleteVente={setDeleteVente}
            setEditVente={setEditVente}
            idShop={idShop}
            setAddVente={setAddVente}
            setPrintVente={setPrintVente}
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
            setPrintEmploye={setPrintEmploye}
          />
        )}
        {show == 4 && (
          <DealersListeClients
            setAddClient={setAddClient}
            setDeleteClient={setDeleteClient}
            setClient={setClient}
            setEditClient={setEditClient}
            setPrintClient={setPrintClient}
          />
        )}
        {show == 5 && (
          <StockListe
            setEditPoductt={setEditPoductt}
            setDeleteProduct={setDeleteProduct}
            setProduct={setProduct}
            setAddProduct={setAddProduct}
          />
        )}
        {show == 6 && (
          <PvListe
            setAddPv={setAddPv}
            setDeletePv={setDeletePv}
            setPv={setPv}
            setEditPv={setEditPv}
            setPrintPv={setPrintPv}
          />
        )}
      </div>
    </>
  );
}

export default Shop;
