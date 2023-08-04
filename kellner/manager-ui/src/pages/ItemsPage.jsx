import React from 'react';
import Header from "../components/Header";
import CirclePattern from "../components/CirclePatterns";
import { useLocation } from 'react-router-dom';

//Components Import
import NoItemsAdded from '../components/NoItemsAdded';
import ItemsAdded from '../components/ItemsAdded';

const ItemsPage =(props)=>{
    const [items, setItems] = React.useState([]);
    const location = useLocation();
    // variable to hold the query value entered in the header search bar
    const [query, setQuery] = React.useState('');
    const {rId, cId, cName} = location.state;

    // function to update the query when something is eneterd in the search bar
    const updateQuery = (userInput)=>{
        setQuery(userInput);
        console.log(userInput);
    };


    React.useEffect(()=>{
        // function to fetch categories from backend
        async function getCategories() {
            const response = await fetch(`http://localhost:5000/api/getItems/${rId}/${cId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
        
            const data = await response.json();
            if (response.status === 200){
                console.log(data.item);
                setItems(data.item)
            }
        
        }
        
        getCategories()
    },[cId, rId]);
    return(
        <>
            <CirclePattern/>
            <Header updateQuery={updateQuery}/>
            {items.length===0 ?(
                <NoItemsAdded rId={rId} cId={cId}/>
            ): (
                <ItemsAdded items={items} rId={rId} cId={cId} cName={cName} query={query}/>
            )}
        </>
    );
}

export default ItemsPage;