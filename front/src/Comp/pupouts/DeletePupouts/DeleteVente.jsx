import { ImCancelCircle } from "react-icons/im";

function DeleteVente({ setDeleteVente, info }) {
  console.log(info);
  const handleCancelVente = () => {
    console.log("Vente canceled");
    setDeleteVente(false);
  };
  const handleCreateVente = () => {
    console.log("vente deleted");
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setDeleteVente(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold text-lg">
          are you sure to delete this vente {info.product}
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCreateVente}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelVente}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteVente;
