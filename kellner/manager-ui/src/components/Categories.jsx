import React from "react";

//Components Import
import NoCategories from "./NoCategories";

const Categories = (props)=>{
    const rId = props.rId;
    const [categories, setCategories] = React.useState([]);

    // function to fetch categories from backend
    async function getCategories() {
        const response = await fetch(`http://localhost:5000/api/getCategory/${rId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
    
        const data = await response.json();
        if (response.status === 200){
            console.log(data.category);
            setCategories(data.category);
        }
    
    }

    React.useEffect(()=>{
        getCategories();
    },[]);
    return(
        <>
            {categories.length === 0 ?(
                <NoCategories res={props.res}/>
            ):(
                <div>Categories</div>
            )}
        </>
    );
}

export default Categories;