//rcfe key for reactcomponent
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "/views/Login.jsx";
import Register from "/views/Register.jsx";
import Mytravel from "/views/Mytravel.jsx";
import Addmytravel from "/views/AddMytravel.jsx";
import UpdateMytravel from "/views/UpdateMytravel.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Mytravel" element={<Mytravel />} />
        <Route path="/addmytravel" element={<Addmytravel />} />
        <Route path="/updatemytravel/:travelId" element={<UpdateMytravel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
