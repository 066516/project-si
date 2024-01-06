import { ImCancelCircle } from "react-icons/im";

function DeleteEmploye({ setDeleteEmploye, Employe }) {
  console.log(Employe);
  const handleCancelEmploye = () => {
    console.log("Employe canceled");
    setDeleteEmploye(false);
  };
  const handleCreateEmploye = () => {
    console.log("Employe deleted");
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setDeleteEmploye(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete this Employe
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCreateEmploye}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelEmploye}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteEmploye;
