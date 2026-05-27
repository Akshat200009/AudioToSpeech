import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Upload from "./Pages/Upload";
import History from "./Pages/History";
import ProtectedRoute
from "./Components/ProtectedRoute";
import { ToastContainer }
from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

  <Route
    path="/upload"

    element={
        <ProtectedRoute>

            <Upload />

        </ProtectedRoute>
    }
/>
       <Route
    path="/history"
    element={<History />}
/>
     
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;