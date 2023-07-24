import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Grid} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';

// Component imports
import nocontentAdded from "../assets/images/noContentAdded.jpg";
import Header from "../components/Header";

//Redux imports
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from '../redux/slices/cartSlice';


const Heading = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'Bold',
    fontSize: '2rem',
    color:'white',
    backgroundColor: 'green'
})

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'Bold',
    fontSize: '2rem',
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
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

const Effect = styled('div')({
    margin:'0 1rem',
    backgroundColor: 'green',
    color:'white',
    '&:hover': {
        cursor: 'pointer',
    }
});


const CartPage = ()=>{
    const items = useSelector(state => state.cart.products);
    const data = [];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let totalPrice = 0;
    for (const i of items){
        let temp = {
            name: i.name,
            image:i.image,
            originalPrice: i.price,
        }
        if(data === []){
            temp.quantity = 1;
            temp.price = temp.quantity * temp.originalPrice;
            data.push(temp);
        } else {
            let founded = false;
            for (const j of data){
                if(j.name === temp.name){
                    founded = true;
                    j.quantity += 1;
                    j.price  = j.quantity * j.originalPrice;
                }
            }
            if(founded === false){
                temp.quantity = 1;
                temp.price = temp.quantity * temp.originalPrice;
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

    const addItemToCart = (item)=>{
        const temp = {
            name: item.name,
            price: item.price,
            image: item.image
        }
        console.log(temp);
        dispatch(addItem(temp));
    }

    const removeItemFromCart = (item)=>{
        const temp = {
            name: item.name,
            price: item.price,
            image: item.image
        }
        dispatch(removeItem(temp));
    }
    return(
        <>
        <Header/>
        {data.length === 0 ? (
            <>
                <Content style={{marginTop:'12rem'}}> No Items in the cart</Content>
                <div>
                    <img src={nocontentAdded} alt={'no content here'}/>
                </div>
            </>
        ) : (
            <>
            <Grid container rowSpacing={3} sx={{marginTop:'12rem'}}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
                <Heading>Item Image</Heading>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
                <Heading>Item Name</Heading>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
                <Heading>Quantity</Heading>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
                <Heading>Price</Heading>
            </Grid>
            {data.map((item)=>{
                return(
                    <>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <img src={item.image} alt={'item'} style={{height:'12rem', width:'12rem', borderRadius:'2rem'}}/>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Content>{item.name}</Content>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Content>
                                <Effect><AddOutlinedIcon  sx={{margin:'0 1rem'}} onClick={()=>{addItemToCart(item)}}/></Effect>
                                {item.quantity}
                                <Effect><RemoveIcon sx={{margin:'0 1rem'}} onClick={()=>{removeItemFromCart(item)}}/></Effect>
                            </Content>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Content>{item.price}</Content>
                        </Grid>
                    </>
                );
            })}
            </Grid>
            <Bottom>
                <div>Total:${totalPrice}</div>
                <Button variant="contained" color="success" sx={{fontSize:'1.5rem'}} onClick={gotoOrderSuccess}> Place Order</Button>
            </Bottom>
            </>
        )}
        </>
    );
}

export default CartPage;