import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashbord from "./pages/Dashbord";
import Shops from "./pages/Shops";
import Ventes from "./pages/Ventes";
import Achates from "./pages/Achates";
import Dealers from "./pages/Dealers";
import Stock from "./pages/Stock";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-screen h-screen  overflow-hidden">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Layout />
                  <Routes>
                    <Route path="/" element={<Dashbord />} />
                  </Routes>
                </>
              }
            />
            <Route
              path="/*"
              element={
                <>
                  <Layout />
                  <Routes>
                    <Route path="/dashboard" element={<Dashbord />} />
                    <Route path="/shops" element={<Shops />} />
                    <Route path="/ventes" element={<Ventes />} />
                    <Route path="/achats" element={<Achates />} />
                    <Route path="/dealers" element={<Dealers />} />
                    <Route path="/Stock" element={<Stock />} />
                    <Route path="/shop" element={<Shop />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
