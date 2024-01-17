import axios from "axios";
import { useEffect, useState } from "react";

function HeaderTopsAchates() {
  const [loading, setLaoding] = useState(true);
  const [tops, setTops] = useState([]);
  useEffect(() => {
    const fetchHeadres = async () => {
      const apiUrl = "https://project-si.onrender.com";
      try {
        const response = await axios.get(`${apiUrl}/achats/tops`);
        console.log(response.data);
        // console.log("Expected an array, received:", typeof response.data);
        setTops(response.data); // Directly store the data if it's an array
      } catch (error) {
        console.error("Error fetching ventes:", error);
      } finally {
        setLaoding(false);
      }
    };

    fetchHeadres();
  }, []);
  return (
    <>
      {!loading && (
        <div className="grid md:grid-cols-3 gap-2">
          <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase ">
            <h1>Top Fournisseur</h1>
            <h2>
              {tops.topFournisseur[0] == null ? (
                "no one "
              ) : (
                <>
                  {tops.topFournisseur[0].fournisseurDetails.Nom_fournisseur}{" "}
                  {tops.topFournisseur[0].fournisseurDetails.Prenom_fournisseur}
                </>
              )}
            </h2>
          </div>
          <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase">
            <h1>Top Employe </h1>
            <h2> {tops.topEmployee.name} </h2>
          </div>
          <div className=" border rounded-xl text-center bg-purple text-white py-2 font-medium uppercase">
            <h1>Top product</h1>
            <h2>  {tops.topProduct[0].productDetails.name}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderTopsAchates;
