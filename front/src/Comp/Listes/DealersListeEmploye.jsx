import { IoMdAdd } from "react-icons/io";

function DealersListeEmploye() {
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5 text-red-500">
        <h1 className="py-2 px-5 text-center  border border-red-500 font-bold  rounded-xl border-[2px]">
          Employes liste
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  rounded-xl border-[2px]">
          Add Employe
          <IoMdAdd fontSize="25px" />
        </h1>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-4 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Full Name </h1>
        <h2>Email</h2>
        <h2 className="hidden md:flex justify-center">phoneNumber</h2>
        <h2 className=" ">salary</h2>
        <h2 className="">Total Absences</h2>
      </div>
      <div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl @gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2>300000DA</h2>
          <h2>20</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium flex flex-wrap items-center">ghemamnbyl@gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2>300000DA</h2>
          <h2>20</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl@gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2>300000DA</h2>
          <h2>20</h2>
        </div>
      </div>
    </div>
  );
}

export default DealersListeEmploye;
