import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Grid} from "@mui/material";

// Component imports
import nocontentAdded from "../assets/images/noContentAdded.jpg";
import Header from "../components/Header";
import CartItems from "../components/CartItems";

//Redux imports
import { useSelector, useDispatch } from "react-redux";
import { addOrderNo } from "../redux/slices/orderSlice";


const Heading = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'Bold',
    fontSize: '2rem',
    color:'white',
    backgroundColor: 'green'
});

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'Bold',
    fontSize: '2rem',
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
});

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
    const rId = useSelector(state => state.restaurant.rId);
    const tId = useSelector(state => state.table.tId);
    const items = useSelector(state => state.cart.products);
    const data = [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
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


    // Function to summarize the order
    const summarizeOrder = (data)=>{
        let temp = {};
        for (const item of data){
            console.log(item);
            // temp is initialized as an empty object because we want to assign both key and value dynamically
            // in that case it is always better use the square bracket format for keys as used below because if we use the dot operator 
            // to assign the keys dynamically javascript will assume it as undefined and will throw an error
            temp[item.name] = item.quantity;
        }
        return temp;
    };
    
    //Function to place the order
    async function placeOrder(orderSummary){
        const response = await fetch(`http://localhost:5000/api/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body : JSON.stringify(orderSummary)
        })

        const data = await response.json();
        if(response.status === 200){
            dispatch(addOrderNo(data));
            navigate('/order-placed');
        }
    }

    const gotoOrderSuccess = (data, totalPrice) =>{
        const orderSummary = {};
        orderSummary.rId = rId;
        orderSummary.tId = tId;
        const itemsOrdered = summarizeOrder(data);
        orderSummary.itemsOrdered = itemsOrdered;
        orderSummary.totalPrice = totalPrice;
        orderSummary.note = '';
        placeOrder(orderSummary);
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
            {data.map((item, index)=>{
                return(
                    <CartItems key={index} item={item}/>
                );
            })}
            </Grid>
            <Bottom>
                <div>Total:${totalPrice}</div>
                <Button variant="contained" color="success" sx={{fontSize:'1.5rem'}} onClick={()=>{gotoOrderSuccess(data, totalPrice)}}> Place Order</Button>
            </Bottom>
            </>
        )}
        </>
    );
}

export default CartPage;