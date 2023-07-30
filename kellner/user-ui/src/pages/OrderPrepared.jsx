import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";

// component imports
import orderArriving from "../assets/images/orderArriving.gif";
import PlainHeader from "../components/PlainHeader";

//redux imports
import { useSelector } from "react-redux";

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontSize: '3rem',
    fontWeight: 'bold',
    marginTop: '8rem'
});

const OrderPrepared = ()=>{
    const orderNo = useSelector(state => state.order.orderNo);
    const [arrived, setArrived] = React.useState(false);
    const navigate = useNavigate();

    //Function to fetch the order status
    async function getOrderStatus(){
        console.log('function called');
        const response = await fetch(`http://localhost:5000/api/getOrderStatus/${orderNo}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
    
        const data = await response.json();
        if(response.status === 200){
            if(data.status === 'Order not found'){
                setArrived(true);
            }
        }
    }

    async function callGetOrderStatus() {
        setInterval(getOrderStatus, 5000);
    }

    React.useEffect(()=>{
        if (arrived === true){
            navigate('/enjoy-your-meal')
        }
    },[arrived]);

    React.useEffect(()=>{
        callGetOrderStatus();
    }, []);

    return(
        <>
            <PlainHeader/>
            <Container>Your food is on its way</Container>
            <img src={orderArriving} alt={'order arriving'} style={{height:'700px'}}/>
        </>
    );
};

export default OrderPrepared;