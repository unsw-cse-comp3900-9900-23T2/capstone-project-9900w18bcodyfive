import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

// component imports
import thanks from "../assets/images/thanks.gif";
import PlainHeader from "../components/PlainHeader";

//redux imports
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { removeOrderNo } from "../redux/slices/orderSlice";
import { removeTable } from "../redux/slices/tableSlice";
import { removeRestaurant } from "../redux/slices/restaurantSlice";

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '9rem'
});
const ThankYou = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(()=>{
        const clearEverything = ()=>{
            dispatch(clearCart());
            dispatch(removeOrderNo());
            dispatch(removeTable());
            dispatch(removeRestaurant());
            navigate('/');
        }
        window.setTimeout(clearEverything, 5000);
    }, [dispatch, navigate]);
    return(
        <>
            <PlainHeader/>
            <Container>Thanks for visiting us</Container>
            <img src={thanks} alt={'thank you'} style={{height:'500px', borderRadius:"2rem", margin:'2rem'}}/>
        </>
    );

}

export default ThankYou;