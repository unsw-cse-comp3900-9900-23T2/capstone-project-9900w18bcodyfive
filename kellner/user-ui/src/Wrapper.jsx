import React from "react";
import { Routes, Route} from 'react-router-dom';

//pages import
import Home from "./pages/Home";
import SelectTable from "./pages/SelectTable";
import Dashboard from "./pages/Dashboard";


const Wrapper = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/select-table" element={<SelectTable/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
};

export default Wrapper;