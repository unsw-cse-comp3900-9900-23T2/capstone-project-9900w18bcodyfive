import React from "react";
import styled from "@emotion/styled";
import { Slide } from "@mui/material";

//Component imports
import userWelcome from "../assets/images/userWelcome.gif";
import HomeHeader from "../components/HomeHeader";

const Container = styled('div')({
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundImage: `url(${userWelcome})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.75,
    fontFamily: 'Nunito',
});

const WelcomeMessageContainer = styled('div')({
    marginTop: '3rem',
    marginLeft: '5rem',
    fontFamily: 'Nunito',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'left',
});

const StyledSelect = styled('select')({
    padding: '15px',
    borderRadius: '10px',
    margin: '1rem',
    fontSize: '1.1rem'
})

const Home = ()=>{
    const [checked, setChecked] = React.useState(false);

    // Triggers the animation everytime the page loads
    React.useEffect(() => {
        setChecked(true);
    },[]);
    return(
        <Container>
            <HomeHeader/>
            <Slide  direction="up" in={checked} {...(checked ? {timeout: 1000} : {}) }collapsedHeight = {50}>
                <WelcomeMessageContainer>
                    <span style={{ fontSize:"3rem"}}>Welcome to <span style={{color:'#006600'}}>Kell</span>ner.</span><br/>
                    Please Choose your restaurant
                    <StyledSelect></StyledSelect>
                </WelcomeMessageContainer>
            </Slide>
        </Container>
    );
};

export default Home;