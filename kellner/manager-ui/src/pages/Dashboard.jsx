import React from 'react';
import Header from '../components/Header';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

import PopUpModal from '../components/PopUpModal';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

const ContentEmpty = styled('div')({
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '7rem'
});

const Dashboard = ()=>{
    const [restaurants, setRestaurants] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = ()=>{
        setOpen(true);
    };
    const handleClose = ()=>{
        setOpen(false);
    };

    if (restaurants.length === 0){
        return(
            <Container>
                <Header/>
                <ContentEmpty>You have not added any restaurants</ContentEmpty>
                <Button variant="contained" color="primary" style={{margin:" 1rem auto", width: "10%"}} onClick={handleOpen}>Add Restaurant</Button>
                <PopUpModal open={open} handleClose={handleClose}/>
            </Container>
        );
    } else {
        return(
            <div>
                <Container>
                    <Header/>
                </Container>
                
            </div>
        );
    }
}

export default Dashboard;