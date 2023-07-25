import styled from "@emotion/styled";
import {Grid} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';

//Redux imports
import { useDispatch } from "react-redux";
import { addItem, removeItem} from '../redux/slices/cartSlice';

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontWeight: 'Bold',
    fontSize: '2rem',
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
});

const Effect = styled('div')({
    margin:'0 1rem',
    backgroundColor: 'green',
    color:'white',
    '&:hover': {
        cursor: 'pointer',
    }
});

const CartItems = ({item})=>{
    const dispatch = useDispatch();
    const addItemToCart = (item)=>{
        const temp = {
            name: item.name,
            price: item.originalPrice,
            image: item.image
        }
        dispatch(addItem(temp));
    }
    
    const removeItemFromCart = (item)=>{
        const temp = {
            name: item.name,
            price: item.originalPrice,
            image: item.image
        }
        dispatch(removeItem(temp));
    }
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
};

export default CartItems;