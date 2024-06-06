import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Main } from "../pages/main/main";

export const Rotas = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/' element={<Main/>}></Route>
    </Routes>
  );
};

export default Rotas;