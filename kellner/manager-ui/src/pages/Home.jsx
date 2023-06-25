import React from 'react';
import { styled } from '@mui/material';
import HomeBg from '../assets/images/Home-Bg.jpg';
import HomeHeader from '../components/HomeHeader';
import Slide from '@mui/material/Slide';

const Container = styled('div')({
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundImage: `url(${HomeBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.75,
    fontFamily: 'Nunito',
});

const WelcomeMessageContainer = styled('div')({
    marginTop: '12rem',
    marginLeft: '5rem',
    fontFamily: 'Nunito',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'left',
});

const Home = () => {
    const [checked, setChecked] = React.useState(false);

    // Triggers the animation everytime the page loads
    React.useEffect(() => {
        setChecked(true);
    },[]);

    return(
        <Container>
            <HomeHeader />
            <Slide  direction="up" in={checked} {...(checked ? {timeout: 1000} : {}) }collapsedHeight = {50}>
                <WelcomeMessageContainer>
                    <span style={{ fontSize:"5rem"}}>Welcome to <span style={{color:'#006600'}}>Kell</span>ner.</span><br/>
                    Your One stop platform to power your Restaurant Operations.
                </WelcomeMessageContainer>
            </Slide>
            
        </Container>
    );
}

export default Home;