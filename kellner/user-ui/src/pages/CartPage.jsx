import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Component imports
import nocontentAdded from "../assets/images/noContentAdded.jpg";
import Header from "../components/Header";

//Redux imports
import { useSelector } from "react-redux";


const Master = styled('div')({
    display:'flex',
    flexDirection: 'column',
    marginTop: '12rem'
});

const ContentContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    margin:'2rem',
    alignItems: 'center',
    border: '2px solid green',
    pading: '1rem',
    borderRadius: '2rem'
})


const Content = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'Bold',
    fontSize: '2rem'
})

const Bottom = styled('div')({
    display: 'flex',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    margin:'2rem',
    fontSize: '2rem',
    padding: '3rem'
});


const CartPage = ()=>{
    const items = useSelector(state => state.cart.products);
    const data = [];
    const navigate = useNavigate();
    let totalPrice = 0;
    for (const i of items){
        let temp = {
            name: i.name,
            image:i.image,
            price: i.price
        }
        if(data === []){
            temp.quantity = 1;
            data.push(temp);
        } else {
            let founded = false;
            for (const j of data){
                if(j.name === temp.name){
                    founded = true;
                    j.quantity += 1;
                    j.price += j.price
                }
            }
            if(founded === false){
                temp.quantity = 1;
                data.push(temp);
            }
        }
    }
    for (const i of data){
        totalPrice = totalPrice + i.price;
    }
    const gotoOrderSuccess = () =>{
        navigate('/order-placed');
    }
    return(
        <>
        <Header/>
        {data.length === 0 ? (
            <div>
                <img src={nocontentAdded} alt={'no content here'}/>
            </div>
        ) : (
            <Master>
            <ContentContainer>
                <Content>Item Image</Content>
                <Content>Item Name</Content>
                <Content>Quantity</Content>
                <Content>Price</Content>
            </ContentContainer>
            {data.map((item)=>{
                return(
                    <>
                    <ContentContainer>
                    <img src={item.image} alt={'item'} style={{height:'12rem', width:'17rem', borderRadius:'2rem'}}/>
                    <Content>{item.name}</Content>
                    <Content>{item.quantity}</Content>
                    <Content>{item.price}</Content>
                    </ContentContainer>
                    </>
                );
            })}
            <Bottom>
                <div>Total:${totalPrice}</div>
                <Button variant="contained" color="success" sx={{fontSize:'1.5rem'}} onClick={gotoOrderSuccess}> Place Order</Button>
            </Bottom>
            </Master>
        )}
        </>
    );
}

export default CartPage;