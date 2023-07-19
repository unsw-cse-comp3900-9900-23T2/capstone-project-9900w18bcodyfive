import React from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

//components export
import Header from "../components/Header";
import Items from "../components/Items";

const Heading = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '12rem',
    marginBottom: '4rem',
    marginLeft: '4rem',
    marginRight: '4rem',
    color:'white'

});
const Container1 = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem',
    
});

const CatItems = ()=>{
    const [items, setItems] = React.useState([]);
    const location = useLocation();
    const {rId, cId, cName} = location.state;

    // function to fetch categories from backend
    async function getItems() {
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

    React.useEffect(()=>{
        getItems();
    },[]);

    return(
        <>
            <Header/>
            <Heading>
                    <div style={{backgroundColor: 'green', width:'80%', borderRadius: '0.5rem'}}>
                        {cName}
                    </div>
            </Heading>
            <Container1>
                    <Items items={items}/>
            </Container1>
        </>
    );

}

export default CatItems;