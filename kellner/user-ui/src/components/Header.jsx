import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Badge} from '@mui/material';

//redux imports
import { useSelector } from 'react-redux';

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

const Utilities = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '100px',
});

const Utility = styled('div')({
    '&:hover':{
        cursor: 'pointer',
        transform: 'scale(0.85)'
    }
});

const StyledHeader = styled('header')({
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '999',
    position: 'fixed'
})

const Header = () => {
    const navigate = useNavigate();
    const items = useSelector(state => state.cart.products);
    const goToCart = ()=>{
        navigate('/cart-page');
    }
    return(
        <StyledHeader>
            <Paper sx={{margin: '0', width:'100%'}}>
                <MasterContainer>
                    <Container>
                        <LogoContainer src={logo}/>
                        <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
                    </Container>
                    <Utilities>
                        <Utility>
                            <Badge badgeContent={items.length} color="success">
                                <ShoppingBasketIcon sx={{fontSize: '3rem', color:'green'}} onClick={goToCart}/>
                            </Badge>
                        </Utility>
                    </Utilities>
                </MasterContainer>
            </Paper>
        </StyledHeader>
    );
}

export default Header;