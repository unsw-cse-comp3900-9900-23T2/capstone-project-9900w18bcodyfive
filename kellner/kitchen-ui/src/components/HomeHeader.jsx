import styled from '@emotion/styled';
import logo from '../assets/logo/Kellner-Logo.png';
import { Paper } from '@mui/material';

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
    width: '6vw',
    objectFit: 'contain',
    margin: '1rem'
});

const NameContainer = styled('div')({
    margin: 0,
    padding: '2rem 0rem',
    fontWeight: 'bolder',
    fontSize: '4rem',
});


const HomeHeader = () => {
    return(
        <Paper>
        <MasterContainer>
            <Container>
                <LogoContainer src={logo}/>
                <NameContainer><span style={{color:'#006600'}}>Kell</span>ner</NameContainer>
            </Container>
        </MasterContainer>
        </Paper>
    );
}

export default HomeHeader;