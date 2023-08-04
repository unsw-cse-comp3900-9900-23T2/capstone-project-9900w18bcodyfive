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
import EditCategory from './EditCategory';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

const CategoryCard = (props)=>{
    const navigate = useNavigate();
    const token = useSelector(state=>state.manager.token);
    const cat= props.cat;
    const [open, setOpen] = React.useState(false);
    const rId = cat.rId;
    const cId = cat.cId;
    //function to open edit category popup
    const handleOpen = ()=>{
        setOpen(true);
    }
    //function to closw edit category
    const handleClose = ()=>{
        setOpen(false);
    }
    //function to delete a category
    async function deleteCategory() {
        const response = await fetch(`http://localhost:5000/api/deleteCategory/${cat.rId}/${cat.cId}`, {
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
                    <Link to={`${cat.cId}/items`} state={{rId, cId, cName:cat.cName}} style={{textDecoration:'none', color:'black'}}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={cat.cImage}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {cat.cName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {cat.cDescription}
                            </Typography>
                        </CardContent>
                    </Link>
                    <div style={{display:'flex', justifyContent:'space-evenly', margin:'1rem'}}>
                        <DeleteEffect>
                            <DeleteIcon onClick={deleteCategory}/>
                        </DeleteEffect>
                        <EditEffect>
                            <EditTwoToneIcon onClick={handleOpen}/>
                            <EditCategory open={open} cat={cat} handleClose={handleClose}/>
                        </EditEffect>
                    </div>
                </Card>
            </Paper>
            </CardEffect>
        </Grid>
    );
}

export default CategoryCard;