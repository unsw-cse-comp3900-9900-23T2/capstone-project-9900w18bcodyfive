import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

//Component imports
import orderPlaced from "../assets/images/orderPlaced.gif";
import placingOrder from "../assets/images/placingOrder.gif";

//redux imports
import { useSelector } from "react-redux";

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
    borderRadius: '10px',
    fontFamily: 'Nunito',
    fontSize: '1.3rem',
    padding: '0.25rem'
});
const OrderPlaced = ()=>{
    const [placed, setPlaced] = React.useState(false);
    const [note, setNote] = React.useState("");
    const orderNo = useSelector(state => state.order.orderNo);
    const navigate = useNavigate();
    const [prepared, setPrepared] = React.useState(false);

    //function to post notes
    async function addNote() {
        const response = await fetch(`http://localhost:5000/api/userAddNote/${orderNo}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body : JSON.stringify({note})
        })
        const data = await response.json();
        if (response.status === 200){
            setNote("");
            window.alert(data.successMessage)
        } else {
            window.alert(data.errorMessage);
        }
    }

    React.useEffect(()=>{
        if(prepared === true){
            navigate('/order-prepared')
        }
    }, [navigate, prepared]);

    React.useEffect(()=>{

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
                if(data.status === 'Ready to Serve'){
                    setPrepared(true);
                }
            }
        }

        async function callGetOrderStatus() {
            setInterval(getOrderStatus, 5000);
        }
        callGetOrderStatus();
    }, [orderNo]);

    // timeout function to show the show the order placing animation
    setTimeout(()=>{
        setPlaced(true);
    },7000)

    const saveNote = (e)=>{
        setNote(e.target.value);
    };

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
                <MainContent>Your Food is getting prepared</MainContent>
                <Content>If you want to make any corrections to your order you can enter your comments below</Content>
                <Container>
                    <Input onChange={saveNote} value={note}/>
                    <Button variant="contained" color="success" sx={{margin:'0 2rem', borderRadius: '10px'}} onClick={addNote}>Post</Button>
                </Container>
                <img src={orderPlaced} alt={'no contnet'}/>
            </>
        )}
        </>
    );
}

export default OrderPlaced;

