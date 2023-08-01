import styled from "@emotion/styled";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// component imports
import PlainHeader from "../components/PlainHeader";
import paymentMethods from "../assets/images/paymentMethods.gif"
//redux imports
import { useSelector } from "react-redux";

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '2rem'
});

const Select = styled('select')({
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    padding:'1rem'
});

const CheckoutPage = ()=>{
    const rId = useSelector(state => state.restaurant.rId);
    const tId = useSelector(state => state.table.tId);
    const [payment, setPayment] = React.useState("");
    const navigate = useNavigate();

    const recordPaymentType = (e)=>{
        setPayment(e.target.value);
    };

    //function to call for checkout
    async function callForCheckout() {
        const response = await fetch(`http://localhost:5000/api/sendCheckOutRequest`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body : JSON.stringify({
                rId: rId,
                tId: tId,
                paymentMethod: payment,
            })
        })
        const data = await response.json();
        if (response.status === 200){
            setPayment("");
            navigate('/thanks-page');
        } else {
            window.alert(data.errorMessage);
        }
    }

    return(
        <>
            <PlainHeader/>
            <Container style={{marginTop:'10rem'}}>Kindly Choose the payment type from below.</Container>
            <Container>Our Wait staff will come to your table with your Bill</Container>
            <Container>
                <Select onChange={recordPaymentType}>
                    <option value="">Please Select Payment type</option>
                    <option value="cash">Cash</option>
                    <option value="eftpos">eftpos</option>
                </Select>
                <Button variant="contained" color="success" sx={{margin:'1rem'}} onClick={callForCheckout}>send Request</Button>
            </Container>
            <img src={paymentMethods} alt={'payment methods'} style={{height:'500px', margin:'2rem', borderRadius: '2rem'}}/>
        </>
    );
};

export default CheckoutPage;