import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashbord from "./pages/Dashbord";
import Shops from "./Comp/Shops";

function App() {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-screen h-screen  overflow-hidden">
        <Router>
          <Routes>
            <Route path="/" />
            <Route
              path="/*"
              element={
                <>
                  <Layout />
                  <Routes>
                    <Route path="/dashboard" element={<Dashbord />} />
                    <Route path="/shops" element={<Shops />} />
                    <Route path="/ventes" />
                    <Route path="/achats" />
                    <Route path="/dealers" />
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
