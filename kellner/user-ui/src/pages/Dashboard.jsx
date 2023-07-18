import React from "react";
import styled from "@emotion/styled";

// Component Imports
import Header from "../components/Header";
import Categories from "../components/Categories";

// Redux Imports
import { useSelector } from "react-redux";

const Container1 = styled('div')({
    display: 'flex',
    marginTop: '10rem',
    justifyContent: 'center'
});
const Dashboard = ()=>{
    const rId = useSelector(state=>state.restaurant.rId)

    //Function to fetch the dashboard
    async function getUserDashboard(){
        const response = await fetch(`http://localhost:5000/api/getUserDashboard/${rId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
    
        const data = await response.json();
        if(response.status === 200){
            console.log(data)
        }
    }

    React.useEffect(()=>{
        getUserDashboard();
    },[]);
    return(
        <>
            <Header/>
            <Container1>
                <Categories/>
            </Container1>
        </>
    );
}

export default Dashboard;