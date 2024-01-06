import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function DealersListeFournisseur({
  setAddFournisseur,
  setDeleteFournisseur,
  setEditFournisseur,
}) {
  const handleEDit = () => {
    setEditFournisseur(true);
  };
  const handleDelete = () => {
    setDeleteFournisseur(true);
  };
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
          Achates Fournisseur
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
          Add Fournisseur
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddFournisseur(true);
            }}
          />
        </h1>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Full Name </h1>
        <h2>Adresse Fournisseur</h2>
        <h2 className="hidden md:flex justify-center">phoneNumber</h2>
        <h2 className=" ">Sold</h2>
        <h2 className="">Total Ventes with his</h2>
        <h2 className="text-red-500">Update Or delete Employe</h2>
      </div>
      <div>
        <div className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">hassi khalifa</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="text-green-500">300000DA</h2>
          <h2>20</h2>
          <h2 className="flex justify-evenly">
            <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
            <MdDeleteForever
              fontSize="25px"
              color="red"
              onClick={handleDelete}
            />
          </h2>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">hassi khalifa</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="text-green-500">300000DA</h2>
          <h2>20</h2>
          <h2 className="flex justify-evenly">
            <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
            <MdDeleteForever
              fontSize="25px"
              color="red"
              onClick={handleDelete}
            />
          </h2>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">hassi khalifa</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="text-green-500">300000DA</h2>
          <h2>20</h2>
          <h2 className="flex justify-evenly">
            <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
            <MdDeleteForever
              fontSize="25px"
              color="red"
              onClick={handleDelete}
            />
          </h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">hassi khalifa</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="text-green-500">300000DA</h2>
          <h2>20</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">hassi khalifa</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="text-green-500">300000DA</h2>
          <h2>20</h2>
        </div>
      </div>
    </div>
  );
}

export default DealersListeFournisseur;
