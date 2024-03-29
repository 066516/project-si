import { useEffect, useState } from "react";
import HeaderTopsDealers from "../Comp/Headres/HeaderTopsDealers";
import DealersListeEmploye from "../Comp/Listes/DealersListeEmploye";
import DealersListeClients from "../Comp/Listes/DealersListeClients";
import DealersListeFournisseur from "../Comp/Listes/DealersListeFournisseur";
import AddEmployee from "../Comp/pupouts/AddPupouts/AddEmploye";
import AddFournisseur from "../Comp/pupouts/AddPupouts/AddFournisseur";
import AddClient from "../Comp/pupouts/AddPupouts/AddClient";
import DeleteClient from "../Comp/pupouts/DeletePupouts/DeleteClient";
import DeleteEmploye from "../Comp/pupouts/DeletePupouts/DeleteEmploye";
import DeleteFournisseur from "../Comp/pupouts/DeletePupouts/DeleteFournisseur";
import UpdateClient from "../Comp/pupouts/Updates/UpdateClient";
import UpdateFournisseur from "../Comp/pupouts/Updates/UpdateFournisseur";
import UpdateEmploye from "../Comp/pupouts/Updates/UpdateEmploye";
import Salary from "../Comp/pupouts/pay/Salary";
import ReglementFournisseur from "../Comp/pupouts/pay/ReglementFournisseur";
import ReglementClient from "../Comp/pupouts/pay/ReglementClient";
import Absence from "../Comp/pupouts/pay/Absence";
import PrintFournisseur from "../Comp/pupouts/printPupouts/PrintFournisseur";
import PrintClient from "../Comp/pupouts/printPupouts/PrintClient";
import PrintEmploye from "../Comp/pupouts/printPupouts/PrintEmploye";

function Dealers() {
  const [typeDealres, setIdtypeDealres] = useState(1);
  const [newEmploye, setAddEmplye] = useState(false);
  const [newFournisseur, setAddFournisseur] = useState(false);
  const [newClient, setAddClient] = useState(false);
  const [EditEmploye, setEditEmploye] = useState(false);
  const [EditClient, setEditClient] = useState(false);
  const [EditFournisseur, setEditFournisseur] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);
  const [deleteFournisseur, setDeleteFournisseur] = useState(false);
  const [deleteEmploye, setDeleteEmploye] = useState(false);
  const [client, setClient] = useState(null);
  const [Employe, setEmploye] = useState(null);
  const [fournisseur, setfournisseur] = useState(null);
  const [printEmploye, setPrintEmploye] = useState(false);

  const [printFournisseur, setPrintFournisseur] = useState(false);
  const [printClient, setPrintClient] = useState(false);

  useEffect(() => {}, []);
  return (
    <>
      {newEmploye && (
        <div className="w-screen h-screen">
          <AddEmployee setAddEmplye={setAddEmplye} />
        </div>
      )}
      {newFournisseur && (
        <div className="w-screen h-screen">
          <AddFournisseur setAddFournisseur={setAddFournisseur} />
        </div>
      )}
      {newClient && (
        <div className="w-screen h-screen">
          <AddClient setAddClient={setAddClient} />
        </div>
      )}
      {EditEmploye && (
        <div className="w-screen h-screen">
          <UpdateEmploye setEditEmploye={setEditEmploye} Employe={Employe} />
        </div>
      )}
      {EditFournisseur && (
        <div className="w-screen h-screen">
          <UpdateFournisseur
            setEditFournisseur={setEditFournisseur}
            fournisseur={fournisseur}
          />
        </div>
      )}
      {EditClient && (
        <div className="w-screen h-screen">
          <UpdateClient setEditClient={setEditClient} client={client} />
        </div>
      )}
      {deleteClient && (
        <div className="w-screen h-screen">
          <DeleteClient setDeleteClient={setDeleteClient} client={client} />
        </div>
      )}
      {deleteFournisseur && (
        <div className="w-screen h-screen">
          <DeleteFournisseur
            setDeleteFournisseur={setDeleteFournisseur}
            fournisseur={fournisseur}
          />
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

      {printFournisseur && (
        <div className="w-screen h-screen">
          <PrintFournisseur
            setPrintFournisseur={setPrintFournisseur}
            fournisseur={fournisseur}
          />
        </div>
      )}
      {printClient && (
        <div className="w-screen h-screen">
          <PrintClient setPrintClient={setPrintClient} Client={client} />
        </div>
      )}
      {printEmploye && (
        <div className="w-screen h-screen">
          <PrintEmploye setPrintEmploye={setPrintEmploye} Employe={Employe} />
        </div>
      )}
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
        {typeDealres == 1 && (
          <DealersListeEmploye
            setAddEmplye={setAddEmplye}
            setEditEmploye={setEditEmploye}
            setDeleteEmploye={setDeleteEmploye}
            setEmploye={setEmploye}
            setPrintEmploye={setPrintEmploye}
          />
        )}
        {typeDealres == 2 && (
          <DealersListeFournisseur
            setAddFournisseur={setAddFournisseur}
            setEditFournisseur={setEditFournisseur}
            setDeleteFournisseur={setDeleteFournisseur}
            setfournisseur={setfournisseur}
            setPrintFournisseur={setPrintFournisseur}
          />
        )}
        {typeDealres == 3 && (
          <DealersListeClients
            setAddClient={setAddClient}
            setEditClient={setEditClient}
            setDeleteClient={setDeleteClient}
            setClient={setClient}
            setPrintClient={setPrintClient}
          />
        )}
      </div>
    </>
  );
}

export default Dealers;
