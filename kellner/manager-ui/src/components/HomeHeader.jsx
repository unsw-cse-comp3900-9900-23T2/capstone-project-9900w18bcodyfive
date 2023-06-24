import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import Button from '@mui/material/Button';

const MasterContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

const Container = styled('div')({
    margin: 0,
    padding: 0,
    display: 'flex',
    maxHeight: '15vh',
    background: 'none',
});

const LogoContainer = styled('img')({
    width: '15vw',
    objectFit: 'contain',
});

const NameContainer = styled('div')({
    margin: 0,
    padding: '2rem 0rem',
    fontWeight: 'bolder',
    fontSize: '4rem',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    minWidth: '20vw',
    justifyContent: 'space-evenly'
})

const HomeHeader = () => {
    return(
        <MasterContainer>
            <Container>
                <LogoContainer src={logo}/>
                <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
            </Container>
            <ButtonContainer>
                <Button variant="contained" color='success' size='large'>Log In</Button>
                <Button variant="contained" color='success' size='large'>Sign Up</Button>
            </ButtonContainer>
        </MasterContainer>
    );
}

export default HomeHeader;