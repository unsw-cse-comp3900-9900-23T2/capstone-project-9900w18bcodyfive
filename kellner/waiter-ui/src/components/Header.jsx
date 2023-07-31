import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import { Paper } from '@mui/material';


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

const StyledHeader = styled('header')({
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '999',
    position: 'fixed'
})

const Header = () => {
    return(
        <StyledHeader>
            <Paper sx={{margin: '0', width:'100%'}}>
                <MasterContainer>
                    <Container>
                        <LogoContainer src={logo}/>
                        <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
                    </Container>
                </MasterContainer>
            </Paper>
        </StyledHeader>
    );
}

export default Header;