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
  useEffect(() => {
    console.log(typeDealres);
  });
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
          <DeleteFournisseur setDeleteFournisseur={setDeleteFournisseur} />
        </div>
      )}
      {deleteEmploye && (
        <div className="w-screen h-screen">
          <DeleteEmploye setDeleteEmploye={setDeleteEmploye} />
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
          />
        )}
        {typeDealres == 2 && (
          <DealersListeFournisseur
            setAddFournisseur={setAddFournisseur}
            setEditFournisseur={setEditFournisseur}
            setDeleteFournisseur={setDeleteFournisseur}
            setfournisseur={setfournisseur}
          />
        )}
        {typeDealres == 3 && (
          <DealersListeClients
            setAddClient={setAddClient}
            setEditClient={setEditClient}
            setDeleteClient={setDeleteClient}
            setClient={setClient}
          />
        )}
      </div>
    </>
  );
}

export default Dealers;
