import { MdEdit, MdDeleteForever } from "react-icons/md";

function StockListe({ setDeleteProduct, setEditPoductt }) {
  const handleEDit = () => {
    setEditPoductt(true);
  };
  const handleDelete = () => {
    setDeleteProduct(true);
  };
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="grid md:grid-cols-6 grid-cols-5 text-center bg-gray-300 px-2 py-2 font-semibold ">
        <h1>Product Name </h1>
        <h2 className="hidden md:flex justify-center">Catogry</h2>
        <h2>Price</h2>
        <h2>Count</h2>
        <h2 className=" ">type</h2>
        <h2 className="text-red-500">Update Or delete Achat</h2>
      </div>
      <div>
        <div className="grid md:grid-cols-6 grid-cols-5 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Row Material</h2>
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
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Row Material</h2>
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
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Row Material</h2>
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
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Prduction</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Row Material</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Prduction</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Row Material</h2>
        </div>
        <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
          <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
          <h2 className="hidden md:flex justify-center">Fruit</h2>
          <h2>300Da</h2>
          <h2>3000</h2>
          <h2 className="text-green-500">Row Material</h2>
        </div>
      </div>
    </div>
  );
}

export default StockListe;
