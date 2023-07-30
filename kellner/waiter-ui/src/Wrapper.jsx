import React from "react";
import { Routes, Route} from 'react-router-dom';

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