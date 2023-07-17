import React from "react";
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import { UseSelector } from "react-redux/es/hooks/useSelector";

//pages import
import Home from "./pages/Home";


const Wrapper = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    );
};

export default Wrapper;