import React from "react";
import { Routes, Route} from 'react-router-dom';

//pages import
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";


const Wrapper = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
};

export default Wrapper;