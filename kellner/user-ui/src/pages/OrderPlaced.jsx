import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

//Component imports
import orderPlaced from "../assets/images/orderPlaced.gif";
import placingOrder from "../assets/images/placingOrder.gif";

const MainContent = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    margin:'2rem'
});

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '1.5rem'
});

const Container = styled('div')({
    display:'flex',
    justifyContent: 'center',
    margin: '2rem'
});

const Input = styled('input')({
    border: '1.5px solid #5c5c8a',
    width: '500px',
    height: '40px',
    borderRadius: '10px'
});
const OrderPlaced = ()=>{
    const [placed, setPlaced] = React.useState(false);

    // timeout function to show the show the order placing animation
    setTimeout(()=>{
        setPlaced(true);
    },7000)

    return(
        <>
        {placed === false ? (
            <>
                <MainContent>We are placing your order please wait</MainContent>
                <img src={placingOrder} alt={'placing order'} style={{ height:'700px'}}/>
            </>
        ):(
            <>
                <MainContent>Order Placed !!!</MainContent>
                <MainContent>You Food is getting prepared</MainContent>
                <Content>If you want to make any corrections to your order you can enter your comments below</Content>
                <Container>
                    <Input/>
                    <Button variant="contained" color="success" sx={{margin:'0 2rem', borderRadius: '10px'}}>Post</Button>
                </Container>
                <img src={orderPlaced} alt={'no contnet'}/>
            </>
        )}
        </>
    );
}

export default OrderPlaced;

