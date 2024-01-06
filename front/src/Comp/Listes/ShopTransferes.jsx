import { IoMdAdd } from "react-icons/io";

function ShopTransferes({ setAddTransft }) {
  return (
    <div className="w-full text-center font-medium mt-5">
      <div className="w-full flex justify-between mt-5">
        <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
          Liste Transfers
        </h1>
        <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
          Add Transfer
          <IoMdAdd
            fontSize="25px"
            onClick={() => {
              setAddTransft(true);
            }}
          />
        </h1>
      </div>

      <div className="w-full text-center font-medium mt-5">
        <div className="grid md:grid-cols-5 grid-cols-4 text-center bg-gray-300 px-2 py-2 font-semibold ">
          <h1>Product Name </h1>
          <h2 className=" ">Catogry</h2>
          <h2 className="hidden md:flex justify-center">Date</h2>
          <h2>Count</h2>
          <h2>Total Amount</h2>
        </div>
        <div className="h-[240px] overflow-y-scroll ">
          <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
            <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
            <h2 className="hidden md:flex justify-center">Fruit</h2>
            <h2>23/12/2023</h2>
            <h2>3000</h2>
            <h2 className="text-green-500">2000DA</h2>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
            <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
            <h2 className="hidden md:flex justify-center">Fruit</h2>
            <h2>23/12/2023</h2>
            <h2>3000</h2>
            <h2 className="text-green-500">2000DA</h2>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
            <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
            <h2 className="hidden md:flex justify-center">Fruit</h2>
            <h2>23/12/2023</h2>
            <h2>3000</h2>
            <h2 className="text-green-500">2000DA</h2>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
            <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
            <h2 className="hidden md:flex justify-center">Fruit</h2>
            <h2>23/12/2023</h2>
            <h2>3000</h2>
            <h2 className="text-green-500">2000DA</h2>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
            <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
            <h2 className="hidden md:flex justify-center">Fruit</h2>
            <h2>23/12/2023</h2>
            <h2>3000</h2>
            <h2 className="text-green-500">2000DA</h2>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-4 text-center py-2 px-2 items-center">
            <h1 className="font-medium text-smaoy ">Nabil ghemam djeridi</h1>
            <h2 className="hidden md:flex justify-center">Fruit</h2>
            <h2>23/12/2023</h2>
            <h2>3000</h2>
            <h2 className="text-green-500">2000DA</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopTransferes;
