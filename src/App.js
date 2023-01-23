import { Divider } from "@chakra-ui/react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Query } from "./pages/Query";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Divider />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/query" element={<Query />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
