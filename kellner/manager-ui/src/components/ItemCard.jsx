import React from 'react';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import styled from "@emotion/styled";

//Component Imports
import EditItems from './EditItems';

//Redux imports
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CardEffect = styled('div')({
    '&:hover': {
        cursor:'pointer',
        transform: 'scale(1.05)'
    }
});

const DeleteEffect = styled('div')({
    '&:hover': {
        transform: 'scale(1.25)',
        color: 'red'
    }
});

const EditEffect = styled('div')({
    '&:hover': {
        transform: 'scale(1.25)',
        color: 'blue'
    }
});

const ItemCard = (props)=>{
    const token = useSelector(state=>state.manager.token);
    const item= props.item;
    const [open, setOpen] = React.useState(false);
    const rId = item.rId;
    const cId = item.cId;
    //function to open edit item popup
    const handleOpen = ()=>{
        setOpen(true);
    }
    //function to closw edit item
    const handleClose = ()=>{
        setOpen(false);
    }
    //function to delete a item
    async function deleteCategory() {
        const response = await fetch(`http://localhost:5000/api/deleteCategory/${rId}/${cId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'authorization': `bearer ${token}`
            }
        })
        const data = await response.json();
        if (response.status === 200){
            window.location.reload();
        } else {
            console.log(data.errorMessage);
            window.alert(data.errorMessage);
        }
    }

    return(
        <Grid item xs={12} sm={12} md={4} lg={3}>
            <CardEffect>
            <Paper sx={{maxWidth:345, borderRadius:'2rem'}}>
                <Card sx={{maxWidth:345, borderRadius:'2rem'}}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
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
                        <DeleteEffect>
                            <DeleteIcon onClick={deleteCategory}/>
                        </DeleteEffect>
                        <EditEffect>
                            <EditTwoToneIcon onClick={handleOpen}/>
                            <EditItems open={open} item={item} handleClose={handleClose}/>
                        </EditEffect>
                    </div>
                </Card>
            </Paper>
            </CardEffect>
        </Grid>
    );
}

export default ItemCard;