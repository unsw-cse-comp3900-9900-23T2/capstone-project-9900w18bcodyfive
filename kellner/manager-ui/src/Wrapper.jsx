import React from 'react';
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom';

// Pages import
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import Loading from './components/Loading';
import Categories from './pages/Categories';

const Wrapper = ()=>{
    const [token, setToken] = React.useState(null);
    const [globalLoading, setGlobalLoading] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    
    // store the token on successful login/register
    function storeToken(token) {
        setToken(token);
        localStorage.setItem('token',token);
        navigate('/dashboard');
    }

    // removing token on logout
    function logout(token) {
        localStorage.removeItem('token');
        navigate('/');
    }
    
    // Checking whether the user is already logged in
    React.useEffect(function () {
        if (localStorage.getItem('token')) {// If the user is logged in take him to the dashboard
            setToken(localStorage.getItem('token'));
            if (['/'].includes(location.pathname)) {
            navigate('/');
            }
        } else { // If the user is not logged in take him to the home page
            navigate('/');
        }
        setGlobalLoading(false); // Setting the page loading state to false because we checked for the token and navigated user accordingly
      }, []);

    // If the page is loading return this
    if (globalLoading === true) {
        return(
            <Loading/>
        );
    } else {
        return(
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register storeToken = {storeToken} />} />
              <Route path="/login" element={<LogIn storeToken = {storeToken}/>} />
              <Route path="/dashboard" element={<Dashboard token={token} logout={logout} />} />
              <Route path="/dashboard/categories/:resId" element={<Categories token={token} logout={logout} />} />
            </Routes>
        );
    }
}

export default Wrapper;