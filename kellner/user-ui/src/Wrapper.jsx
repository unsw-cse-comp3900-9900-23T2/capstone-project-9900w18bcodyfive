import React from "react";
import { Routes, Route} from 'react-router-dom';

//pages import
import Home from "./pages/Home";
import SelectTable from "./pages/SelectTable";
import Dashboard from "./pages/Dashboard";
import CatItems from "./pages/CatItems";


const Wrapper = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/select-table" element={<SelectTable/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/:cId/items" element={<CatItems/>}/>
        </Routes>
    );
};

export default Wrapper;