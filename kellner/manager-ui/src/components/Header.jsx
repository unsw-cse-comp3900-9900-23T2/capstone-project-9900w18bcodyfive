import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const MasterContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

const Container = styled('div')({
    margin: 0,
    padding: 0,
    display: 'flex',
    maxHeight: '10vh',
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
    fontSize: '3rem',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    minWidth: '20vw',
    justifyContent: 'space-evenly'
})

const Header = ()=>{
    const navigate = useNavigate();
    return(
        <MasterContainer>
            <Container>
                <LogoContainer src={logo}/>
                <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
            </Container>
            <ButtonContainer>
                <Button variant="contained" color='success' size='large' onClick={()=>{navigate('/')}}>Log Out</Button>
            </ButtonContainer>
        </MasterContainer>
    );
}

export default Header;