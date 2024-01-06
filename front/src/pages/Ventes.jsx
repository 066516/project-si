import { IoMdAdd } from "react-icons/io";
import HeaderTopsVente from "../Comp/Headres/HeaderTopsVente";
import { useState } from "react";
import AddVente from "../Comp/pupouts/AddPupouts/AddVente";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import UpdateVentes from "../Comp/pupouts/Updates/UpdateVentes";
import DeleteVente from "../Comp/pupouts/DeletePupouts/DeleteVente";
function Ventes() {
  const [newvente, setAddVente] = useState(false);
  const [Editvente, setEditVente] = useState(false);
  const [Deletevente, setDeleteVente] = useState(false);
  const [info, setInfo] = useState({
    product: 3,
    client: 2,
    count: 23,
    price: 22,
    type: "Totalment",
  });
  const handleEDit = () => {
    setEditVente(true);
  };
  const handleDelete = () => {
    setDeleteVente(true);
  };
  return (
    <>
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
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <HeaderTopsVente />
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Ventes liste
          </h1>
          <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
            Add vente
            <IoMdAdd
              fontSize="25px"
              onClick={() => {
                setAddVente(true);
              }}
            />
          </h1>
        </div>

        <div className="w-full text-center font-medium mt-5">
          <div className="grid md:grid-cols-7 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold ">
            <h1>Produit </h1>
            <h2>Client</h2>
            <h2 className="hidden md:flex">Date</h2>
            <h2 className=" ">Count</h2>
            <h2 className="">Total Amount</h2>
            <h2 className="hidden md:flex">Paiment type</h2>
            <h2 className="text-red-500">Update Or delete Vente</h2>
          </div>
          <div>
            <div className="grid md:grid-cols-7 grid-cols-5 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-red-500 ">Tomato</h1>
              <h2 className="font-medium text-green-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:flex">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2 className="hidden md:flex">Parcielment</h2>
              <h2 className="flex justify-evenly">
                <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
                <MdDeleteForever
                  fontSize="25px"
                  color="red"
                  onClick={handleDelete}
                />
              </h2>
            </div>
            <div className="grid md:grid-cols-7 grid-cols-5 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-red-500 ">Tomato</h1>
              <h2 className="font-medium text-green-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:flex">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2 className="hidden md:flex">Parcielment</h2>
              <h2 className="flex justify-evenly">
                <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
                <MdDeleteForever
                  fontSize="25px"
                  color="red"
                  onClick={handleDelete}
                />
              </h2>
            </div>
            <div className="grid md:grid-cols-7 grid-cols-5 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-red-500 ">Tomato</h1>
              <h2 className="font-medium text-green-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:flex">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2 className="hidden md:flex">Parcielment</h2>
              <h2 className="flex justify-evenly">
                <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
                <MdDeleteForever
                  fontSize="25px"
                  color="red"
                  onClick={handleDelete}
                />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ventes;
