import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Header from '../components/Header';
import PopUpModal from '../components/PopUpModal';


const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

const ContentEmpty = styled('div')({
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '7rem'
});

const Categories = (props)=>{
    const url = window.location.toString();
    const splittedUrl =  url.split(':')
    const [resId, setResId] = React.useState(splittedUrl[3]);
    const [categories, setCategories] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = ()=>{
        setOpen(true);
    };
    const handleClose = ()=>{
        setOpen(false);
    };

    async function getAllCategories(){
        const response = await fetch(`http://localhost:5000/api/getCateories/:${resId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await response.json();
        if(response.status === 200){
            console.log(data)
        }
    }

    React.useEffect(()=>{
        getAllCategories();
    },[]);

    if(categories.length === 0){
        return(
        <Container>
            <Header logout={props.logout}/>
            <ContentEmpty>You have not added any Categories</ContentEmpty>
            <Button variant="contained" color="primary" style={{margin:" 1rem auto", width: "10%"}} onClick={handleOpen}>Add Category</Button>
            <PopUpModal open={open} token={props.token} handleClose={handleClose}/>
        </Container>
        );
    }
}

export default Categories;