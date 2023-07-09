import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

// Redux Imports
import { useSelector } from "react-redux";

// Component Imports
import Header from "../components/Header";
import CirclePattern from "../components/CirclePatterns";
import welcomeAnimation from "../assets/images/welcomeAnimation.gif"

const Container1 = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    margin: '1rem 3rem',
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
    flexDirection: 'column'
});



const Dashboard = () => {
    const mName = useSelector(state => state.manager.mName)

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
            </Container2>
            
        </>
    );
}

export default Dashboard;