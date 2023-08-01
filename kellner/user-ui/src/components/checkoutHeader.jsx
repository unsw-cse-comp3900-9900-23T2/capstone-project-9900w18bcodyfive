import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import { Paper } from '@mui/material';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const MasterContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const Container = styled('div')({
    margin: 0,
    padding: 0,
    display: 'flex',
    maxHeight: '15vh',
    background: 'none',
    alignItems: 'center'
});

const LogoContainer = styled('img')({
    width: '6vw',
    objectFit: 'contain',
    margin: '2rem'
});

const NameContainer = styled('div')({
    margin: 0,
    padding: '2rem 0rem',
    fontWeight: 'bolder',
    fontSize: '4rem',
});


const StyledHeader = styled('header')({
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '999',
    position: 'fixed'
})

const CheckoutHeader = () => {
    const navigate = useNavigate();

    const goToCheckout = ()=>{
        navigate('/checkout')
    };
    return(
        <StyledHeader>
            <Paper sx={{margin: '0', width:'100%'}}>
                <MasterContainer>
                    <Container>
                        <LogoContainer src={logo}/>
                        <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
                    </Container>
                    <Container>
                        <Button variant="contained" color="success" sx={{height:'3rem', margin:'3rem', fontSize:'1.2rem'}} onClick={goToCheckout}>Checkout</Button>
                    </Container>
                </MasterContainer>
            </Paper>
        </StyledHeader>
    );
}

export default CheckoutHeader;