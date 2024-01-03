import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashbord from "./pages/Dashbord";

function App() {
  return (
    <>
      <div className="flex flex-col sm:flex-row w-screen overflow-y-hidden">
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
                    <Route path="/shops" />
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
