import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
function DealersListeEmploye({
  setAddEmplye,
  setDeleteEmploye,
  setEditEmploye,
  setpaySalary,
  setAbsence,
}) {
  const handleEDit = () => {
    setEditEmploye(true);
  };
  const handleDelete = () => {
    setDeleteEmploye(true);
  };
  const paysalaryHandle = () => {
    setpaySalary(true);
  };
  const AbsenceHandle = () => {
    setAbsence(true);
  };
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5 text-red-500">
        <h1 className="py-2 px-5 text-center  border border-red-500 font-bold  rounded-xl border-[2px]">
          Employes liste
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-red-500  rounded-xl border-[2px]">
          Add Employe
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddEmplye(true);
            }}
          />
        </h1>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-4 text-center bg-gray-300 px-2 py-2 font-semibold mt-5">
        <h1>Full Name </h1>
        <h2>Email</h2>
        <h2 className="hidden md:flex justify-center">phoneNumber</h2>
        <h2 className="hidden md:flex justify-center">salary</h2>
        <h2 className="">Total Absences</h2>
        <h2 className="text-red-500">Update Or delete Employe</h2>
      </div>
      <div>
        <div className="grid md:grid-cols-6 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl @gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="hidden md:flex justify-center">300000DA</h2>
          <h2>20</h2>
          <h2 className="flex justify-evenly cursor-pointer items-center ">
            <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
            <MdDeleteForever
              fontSize="25px"
              color="red"
              onClick={handleDelete}
            />
            <GiPayMoney onClick={paysalaryHandle} />
            <span
              className="font-bold text-3xl text-center  pb-3 flex items-center justify-center "
              onClick={AbsenceHandle}
            >
              -
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl @gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="hidden md:flex justify-center">300000DA</h2>
          <h2>20</h2>
          <h2 className="flex justify-evenly items-center">
            <MdEdit fontSize="25px" color="blue" onClick={handleEDit} />
            <MdDeleteForever
              fontSize="25px"
              color="red"
              onClick={handleDelete}
            />
            <GiPayMoney />
            <span className="font-bold text-3xl text-center  pb-3 flex items-center justify-center ">
              -
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl @gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2 className="hidden md:flex justify-center">300000DA</h2>
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
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl @gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2>300000DA</h2>
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
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium ">ghemamnbyl @gmail.com</h2>
          <h2 className="hidden md:flex justify-center">0665666666</h2>
          <h2>300000DA</h2>
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
          <h1 className="font-medium text-red-500 ">Nabil ghemam djeridi</h1>
          <h2 className="font-medium flex flex-wrap items-center">
            ghemamnbyl@gmail.com
          </h2>
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
