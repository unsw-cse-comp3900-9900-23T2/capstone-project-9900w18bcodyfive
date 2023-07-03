import React from 'react';
import Header from '../components/Header';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

import PopUpModal from '../components/PopUpModal';
import RestaurantCard from '../components/RestaurantCard';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

const ContentEmpty = styled('div')({
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '7rem'
});

const RestaurantCardContainer = styled('div')({
    display: 'flex',
    border: '2px solid #006600',
    margin: '4rem 1rem',
    borderRadius: '4px'
});

const Dashboard = (props)=>{
    const [restaurants, setRestaurants] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = ()=>{
        setOpen(true);
    };
    const handleClose = ()=>{
        setOpen(false);
    };

    async function getAllRestaurants(){
        const response = await fetch('http://localhost:5000/api/getRestaurants', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `${props.token}`,
            },
        })
        const data = await response.json();
        if(response.status === 200){
            console.log(data.restaurant)
            setRestaurants(data.restaurant)
        }
    }
    React.useEffect(()=>{
        getAllRestaurants()
    },[]);

    if (restaurants.length === 0){
        return(
            <Container>
                <Header logout={props.logout}/>
                <ContentEmpty>You have not added any restaurants</ContentEmpty>
                <Button variant="contained" color="primary" style={{margin:" 1rem auto", width: "10%"}} onClick={handleOpen}>Add Restaurant</Button>
                <PopUpModal open={open} token={props.token} handleClose={handleClose}/>
            </Container>
        );
    } else {
        return(
            <div>
                <Container>
                    <Header/>
                    <RestaurantCardContainer>
                        {restaurants.map((r, idx)=>{
                            return(
                                <RestaurantCard key={idx} res={r}/>
                            );
                        })}
                    </RestaurantCardContainer>
                    <Button variant="contained" color="primary" style={{margin:" 1rem auto", width: "10%"}} onClick={handleOpen}>Add Restaurant</Button>
                    <PopUpModal open={open} token={props.token} handleClose={handleClose}/>
                </Container>
                
            </div>
        );
    }
}

export default Dashboard;