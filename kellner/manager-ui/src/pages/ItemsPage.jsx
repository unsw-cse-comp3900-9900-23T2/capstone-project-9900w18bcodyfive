import React from 'react';
import Header from "../components/Header";
import CirclePattern from "../components/CirclePatterns";
import { useLocation } from 'react-router-dom';

const ItemsPage =(props)=>{
    const location = useLocation();
    // variable to hold the query value entered in the header search bar
    const [query, setQuery] = React.useState('');
   console.log(location.state)

    // function to update the query when something is eneterd in the search bar
    const updateQuery = (userInput)=>{
        setQuery(userInput);
        console.log(userInput);
    };

    // function to fetch categories from backend

    return(
        <>
            <CirclePattern/>
            <Header updateQuery={updateQuery}/>
        </>
    );
}

export default ItemsPage;