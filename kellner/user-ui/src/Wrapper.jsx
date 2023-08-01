import React from "react";
import { Routes, Route} from 'react-router-dom';

//pages import
import Home from "./pages/Home";
import SelectTable from "./pages/SelectTable";
import Dashboard from "./pages/Dashboard";
import CatItems from "./pages/CatItems";
import CartPage from "./pages/CartPage";
import OrderPlaced from "./pages/OrderPlaced";
import OrderPrepared from "./pages/OrderPrepared";
import EnjoyYourMeal from "./pages/EnjoyYourMeal";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYou from "./pages/thankYou";


const Wrapper = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/select-table" element={<SelectTable/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/:cId/items" element={<CatItems/>}/>
            <Route path="/cart-page" element={<CartPage/>}/>
            <Route path="/order-placed" element={<OrderPlaced/>}/>
            <Route path="/order-prepared" element={<OrderPrepared/>}/>
            <Route path="/enjoy-your-meal" element={<EnjoyYourMeal/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/thanks-page" element={<ThankYou/>}/>
        </Routes>
    );
};

export default Wrapper;