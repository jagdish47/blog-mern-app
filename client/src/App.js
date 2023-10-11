import { useState } from "react";

import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthentication] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: "100px" }}>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isUserAuthentication} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/login"
              element={<Login isUserAuthentication={isUserAuthentication} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
