import { IoMdAdd } from "react-icons/io";
import HeaderTopsAchates from "../Comp/Headres/HeaderTopsAchates";
import { useState } from "react";
import AddAchat from "../Comp/pupouts/AddPupouts/AddAchat";

function Achates() {
  const [Achat, setAddAchat] = useState(false);
  return (
    <>
      {Achat && (
        <div className="w-screen h-screen">
          <AddAchat setAddAchat={setAddAchat} />
        </div>
      )}
      <div
        className={` text-black   shadow-lg      h-screen w-full  px-3 mt-12  overflow-y-scroll    pb-20   `}
      >
        <HeaderTopsAchates />
        <div className="w-full flex justify-between mt-5">
          <h1 className="py-2 px-5 text-center  border border-smaoy font-bold text-smaoy rounded-xl border-[2px]">
            Achates liste
          </h1>
          <h1 className="py-2 px-5 text-center cursor-pointer flex items-center gap-1 font-bold border border-smaoy text-smaoy rounded-xl border-[2px]">
            Add Achat
            <IoMdAdd
              fontSize="25px"
              onClick={() => {
                setAddAchat(true);
              }}
            />
          </h1>
        </div>

        <div className="w-full text-center font-medium mt-5">
          <div className="grid grid-cols-6 text-center bg-gray-300 px-2 py-2 font-semibold">
            <h2>Produit</h2>
            <h2>Fournisseur</h2>
            <h2 className="hidden md:block">Date</h2>
            <h2>Count</h2>
            <h2>Total Amount</h2>
            <h2>Paiment type</h2>
          </div>

          <div>
            <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-green-500">Tomato</h1>
              <h2 className="font-medium text-blue-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:block">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2>Parcielment</h2>
            </div>
            <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-green-500">Tomato</h1>
              <h2 className="font-medium text-blue-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:block">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2>Parcielment</h2>
            </div>
            <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-green-500">Tomato</h1>
              <h2 className="font-medium text-blue-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:block">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2>Parcielment</h2>
            </div>
            <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-green-500">Tomato</h1>
              <h2 className="font-medium text-blue-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:block">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2>Parcielment</h2>
            </div>
            <div className="grid grid-cols-6 text-center py-2 px-2 items-center">
              <h1 className="font-medium text-green-500">Tomato</h1>
              <h2 className="font-medium text-blue-500">
                Nabil ghemam djeridi
              </h2>
              <h2 className="hidden md:block">25/10/2023</h2>
              <h2>20</h2>
              <h2>200DA</h2>
              <h2>Parcielment</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Achates;
