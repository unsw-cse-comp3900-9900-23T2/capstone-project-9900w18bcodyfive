import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import {Button} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

// Components import
import ItemCard from "./ItemCard";
import AddItems from "./AddItems";

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    margin: '6rem 2rem',

});

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '2rem',
    margin: '3rem',
    fontWeight: 'bold',
    textAlign: 'left'
});
const ItemsAdded = (props)=>{
    const items = props.items;
    const cName = props.cName;
    const query = props.query;
    const [open, setOpen] = React.useState(false);

    //Function to open the add Items popup
    const handleOpen = ()=>{
        setOpen(true);
    };

    //function close the Add Items popup
    const handleClose = ()=>{
        setOpen(false);
    };
    return(
        <Container>
            <Content>
                {cName}
                <Button variant="contained" color="success" sx={{margin: '1rem'}} onClick={handleOpen}>
                        <AddCircleRoundedIcon sx={{color:'white', fontSize:'2.5rem'}}/>
                        <span style={{margin: '0 1rem', fontSize:'1rem'}}>Add Item</span>
                </Button>
                <AddItems open={open} rId={props.rId} cId={props.cId} handleClose={handleClose}/>
            </Content>
            <Grid container rowSpacing={2}>
                {items.filter(item =>item.iName.toLowerCase().includes(query.toLowerCase())).map((item)=>{
                    return(
                        <ItemCard item={item}/>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default ItemsAdded;