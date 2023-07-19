import React from "react";
import { Routes, Route} from 'react-router-dom';

//pages import
import Home from "./pages/Home";
import SelectTable from "./pages/SelectTable";
import Dashboard from "./pages/Dashboard";
import CatItems from "./pages/CatItems";
import CartPage from "./pages/CartPage";
import OrderPlaced from "./pages/OrderPlaced";


const Wrapper = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/select-table" element={<SelectTable/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/:cId/items" element={<CatItems/>}/>
            <Route path="/cart-page" element={<CartPage/>}/>
            <Route path="/order-placed" element={<OrderPlaced/>}/>
        </Routes>
    );
};

export default Wrapper;