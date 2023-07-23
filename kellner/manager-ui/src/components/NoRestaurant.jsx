import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

//Component and image imports
import noContentAdded from "../assets/images/noContentAdded.jpg";
import PopUpModal from "./PopUpModal";


const Container = styled('div')({
    display: 'flex',
    margin: '0',
    width: '100%',
    height: '1000px',
    justifyContent: 'center',
});

const Child = styled('div')({
    border: '5px solid #006600',
    fontFamily: "Nunito",
    fontSize: '2rem',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column'
});

const Image = styled('div')({
    border: '5px solid #006600',
    backgroundImage: `url(${noContentAdded})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    flex: '1',
})

const Content = styled('div')({
    display: 'flex',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    margin: '1rem',
    justifyContent: 'center'
});



const NoRestaurantAdded  = (props)=>{
    const [open, setOpen] = React.useState(false);
    const openModal = ()=>{
        setOpen(true);
    };
    const closeModal = ()=>{
        setOpen(false);
    };
    return(
        <Container>
            <Child>
                <Content>It seems like you have not added any restaurants. You have not added any restaurant !</Content>
                <Content>You can easily add restaurant by clicking the button below</Content>
                <div><Button  variant="contained" color="success" onClick={openModal} sx={{fontSize:'1.2rem'}}>Add Restaurant</Button></div>
                <PopUpModal open={open} handleClose={closeModal}/>
            </Child>
            <Image />
        </Container>
    );
};

export default NoRestaurantAdded;

