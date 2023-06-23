import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';

const Container = styled('div')({
    display: 'flex',
    maxHeight: '20vh',
    background: 'blue'
});

const LogoContainer = styled('img')({
    width: '20vw',
    objectFit: 'contain',
});

const HomeHeader = () => {
    return(
        <Container>
            <LogoContainer src={logo}/>
        </Container>
    );
}

export default HomeHeader;