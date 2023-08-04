import React from 'react';
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

// Pages import
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import Loading from "./assets/images/Loading.gif";
import ItemsPage from './pages/ItemsPage';

const Wrapper = ()=>{
    const token = useSelector(state => state.manager.token);
    const [globalLoading, setGlobalLoading] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    

    
    // Checking whether the user is already logged in
    React.useEffect(function () {
        if (token !== null) {// If the user is logged in take him to the dashboard
            if (['/'].includes(location.pathname)) {
            navigate('/dashboard');
            }
        } else { // If the user is not logged in take him to the home page
            navigate('/');
        }
        setGlobalLoading(false); // Setting the page loading state to false because we checked for the token and navigated user accordingly
      }, [location.pathname, navigate, token]);

    // If the page is loading return this
    if (globalLoading === true) {
        return(
            <img src={Loading} alt={'Loading'}/>
        );
    } else {
        return(
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:cId/items" element={<ItemsPage />} />
            </Routes>
        );
    }
}

export default Wrapper;