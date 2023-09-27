import "./App.css";
// import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Cart from "./components/Cart";


function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"*"} element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
