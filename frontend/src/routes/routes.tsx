import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Main } from "../pages/main/main";
import { CreateProduct } from "../pages/create-product/create-product";
import { UpdateProduct } from "../pages/update-product/update-product";
import { CreateUser } from "../pages/create-user/create-user";
import { UpdateUser } from "../pages/update-user/update-user";

export const Rotas = () => {
  return (
    <Routes >
        <Route path="/update-product/:idProduct" element={<UpdateProduct/>}></Route>
        <Route path="/create-product" element={<CreateProduct/>}></Route>
        <Route path="/update-user/:idUser" element={<UpdateUser/>}></Route>
        <Route path="/create-user" element={<CreateUser/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/' element={<Main/>}></Route>
    </Routes>
  );
};

export default Rotas;