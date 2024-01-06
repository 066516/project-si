import { ImCancelCircle } from "react-icons/im";

function DeleteFournisseur({ setDeleteFournisseur, fournisseur }) {
  console.log(fournisseur);

  const handleCancelfournisseur = () => {
    console.log("fournisseur canceled");
    setDeleteFournisseur(false);
  };
  const handledeltefournisseur = () => {
    console.log("fournisseur deleted");
  };
  return (
    <div className="relative bg-blue2/80 z-[100] w-screen h-screen flex justify-center items-start">
      <div className="bg-white relative top-3 p-5 rounded-xl">
        <ImCancelCircle
          onClick={() => setDeleteFournisseur(false)}
          className="absolute top-2 right-2 cursor-pointer "
        />
        <h1 className="uppercase font-bold   text-lg">
          are you sure to delete this fournisseur
        </h1>

        <div className="mt-5 flex justify-between">
          <h1
            className="bg-blue2 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handledeltefournisseur}
          >
            Delete
          </h1>
          <h1
            className="bg-red-500 w-fit text-white px-5 py-2 cursor-pointer rounded-xl"
            onClick={handleCancelfournisseur}
          >
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DeleteFournisseur;
