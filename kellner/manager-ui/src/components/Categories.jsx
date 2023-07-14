import React from "react";

//Redux Imports
import { useSelector } from "react-redux/es/hooks/useSelector";

const Categories = ()=>{
    const token = useSelector(state => state.manager.token)
    // function to fetch categories from backend
    async function getRestaurant() {
        const response = await fetch('http://localhost:5000/api/getRestaurant', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `bearer ${token}`
            },
        })
    
        const data = await response.json();
        if (response.status === 200){
            console.log(data.restaurant);
            setRestaurantList(data.restaurant);
            setLoading(false);
        }
    
    }

    React.useEffect(()=>{
        getCategories();
    },[]);
    return(
        <div></div>
    );
}

export default Categories;