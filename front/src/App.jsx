import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Dashbord from "./pages/Dashbord";
import Shops from "./pages/Shops";
import Ventes from "./pages/Ventes";
import Achates from "./pages/Achates";
import Dealers from "./pages/Dealers";
import Stock from "./pages/Stock";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Main from "./pages/Main";
import { useEffect } from "react";

const ProtectedLayout = ({ children }) => {
  const isAuthenticated = Cookies.get("authToken"); // Adjust according to your authentication logic
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  });

  return <div>{children}</div>;
};

function App() {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-screen h-screen  overflow-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  <Layout />
                  <ProtectedLayout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashbord />} />
                      <Route path="/shops" element={<Shops />} />
                      <Route path="/ventes" element={<Ventes />} />
                      <Route path="/achats" element={<Achates />} />
                      <Route path="/dealers" element={<Dealers />} />
                      <Route path="/Stock" element={<Stock />} />
                      <Route path="/shop" element={<Shop />} />
                    </Routes>
                  </ProtectedLayout>
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
