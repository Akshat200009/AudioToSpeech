import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Upload from "./Pages/Upload";
import History from "./Pages/History";

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
        element={<Upload />}
/>
       
       <Route
    path="/history"
    element={<History />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;