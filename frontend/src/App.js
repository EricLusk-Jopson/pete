import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Header from "./components/Header";
import { IsMobileContextProvider } from "./contextProviders/useIsMobile";

function App() {
  return (
    <>
      <Router>
        <IsMobileContextProvider>
          <div className="container">
            <Header />
            <Routes>
              <Route path="/*" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </div>
        </IsMobileContextProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
