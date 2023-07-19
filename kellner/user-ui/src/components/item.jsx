import React from 'react';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Paper} from "@mui/material";
import styled from "@emotion/styled";
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/slices/cartSlice';




const CardEffect = styled('div')({
    '&:hover': {
        cursor:'pointer',
        transform: 'scale(1.05)'
    }
});

const Effect = styled('div')({
    '&:hover': {
        transform: 'scale(1.25)',
        color: 'blue'
    }
});

const Input = styled('input')({
    border: '1px solid gray',
    heignt: '2rem',
    width: '4rem',
    borderRadius:'1rem',
    fontSize: '1.1rem',
    textAlign: 'center'
});

const Item = (props)=>{
    const item= props.item;
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.products);
    const GetQuantity = (items, name)=>{
        console.log(name);
        let q = 0
        for (const i of items){
            if(i.name === name){
                q += 1;
            }
        }
        return q;
    }
    const [quantity, setQuantity] = React.useState(GetQuantity(items, item.iName));
    console.log(quantity)

    const addItemToCart = ()=>{
        const temp = {
            name: item.iName,
            price: item.iPrice
        }
        dispatch(addItem(temp));
        setQuantity(quantity + 1);
    }

    const removeItemFromCart = ()=>{
        const temp = {
            name: item.iName,
            price: item.iPrice,
        }
        dispatch(removeItem(temp));
        setQuantity(quantity - 1);
    }

    return(
        <Grid item xs={12} sm={12} md={4} lg={3}>
            <CardEffect>
            <Paper sx={{maxWidth:345, borderRadius:'2rem'}}>
                <Card sx={{maxWidth:345, borderRadius:'2rem'}}>
                        <CardMedia
                            component="img"
                            alt="item image"
                            height="140"
                            image={item.iImage}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.iName}
                            </Typography>
                            <Typography variant="body1">
                                {item.iDescription}
                            </Typography>
                            <Typography variant="body1">
                                <span style={{fontWeight: 'bold'}}>Ingredients: </span>{item.iIngredients}
                            </Typography>
                            <div style={{fontWeight: 'bold'}}>Price: ${item.iPrice}</div>
                        </CardContent>
                    <div style={{display:'flex', justifyContent:'space-evenly', margin:'1rem'}}>
                        {quantity === 0 ?(
                            <Button variant="contained" color="success" onClick={addItemToCart}>Add to Plate</Button>
                        ): (
                            <>
                                <AddIcon onClick={addItemToCart}/>
                                <Input value={quantity}/>
                                <RemoveIcon onClick={removeItemFromCart}/>
                            </>
                        )}
                    </div>
                </Card>
            </Paper>
            </CardEffect>
        </Grid>
    );
}

export default Item;