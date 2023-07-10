import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

// Redux Imports
import { useSelector } from "react-redux";

// Component Imports
import Header from "../components/Header";
import CirclePattern from "../components/CirclePatterns";
import welcomeAnimation from "../assets/images/welcomeAnimation.gif"
import NoRestaurantAdded from "../components/NoRestaurant";
import RestaurantAdded from "../components/RestaurantAdded";


const Container1 = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    margin: '5rem 3rem',
    padding: '2rem 1rem',
    flexDirection: 'column',
    alignItems: 'start'
});

const WelcomeGifContainer = styled('div')({
    display: 'flex',
    marginTop: '1rem'
});

const Container2 = styled('div')({
    display: 'flex',
    fontFamily: 'Nunito',
    fontSize: '2rem',
    backgroundColor:'#b3ffb3',
});



const Dashboard = () => {
    const mName = useSelector(state => state.manager.mName)
    const token = useSelector(state => state.manager.token)
    const [restaurantList, setRestaurantList] = React.useState([])

    // function which fetch the restaurant data from backend
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
            console.log(data.restaurant)
            setRestaurantList(data.restaurant)
        }
    
    }


    React.useEffect(()=>{
        getRestaurant()
    },[]);

    return(
        <>
            <CirclePattern />
            <Header />
            <Container1>
                <span style={{ fontSize:"3rem"}}>Welcome <span style={{color:'#006600'}}>{mName}</span></span><br/>
                <div>You can get started by configuring your restaurant</div>
                <a href='#restaurantDetails'><Button size="large" variant="contained" color="success">Get Started</Button></a>
                <WelcomeGifContainer>
                    <img alt="welcome animation" src={welcomeAnimation}/>
                </WelcomeGifContainer>
            </Container1>
            <Container2 id="restaurantDetails">
                {(restaurantList.length === 0) ? (
                   <NoRestaurantAdded />
                ) : (
                    <RestaurantAdded rImage={restaurantList[0].rImage}/>
                )}
            </Container2>
            
        </>
    );
}

export default Dashboard;