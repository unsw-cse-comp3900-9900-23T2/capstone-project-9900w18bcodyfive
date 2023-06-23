import React from 'react';
import { styled } from '@mui/material';
import HomeBg from '../assets/images/Home-Bg.jpg';
import HomeHeader from '../components/HomeHeader';

const Container = styled('div')({
    minHeight: '100vh',
    backgroundImage: `url(${HomeBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.75
});

const Home = () => {
    return(
        <Container>
            <HomeHeader />
        </Container>
    );
}

export default Home;