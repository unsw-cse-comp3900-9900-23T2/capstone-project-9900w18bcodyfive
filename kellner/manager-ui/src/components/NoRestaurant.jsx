import React from "react";
import styled from "@emotion/styled";

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

const Button = styled('button')({
    color: 'white',
    borderRadius: '5rem',
    backgroundColor: 'green',
    width: '15rem',
    height: '3rem',
    fontSize: '1.5rem',
    marginTop: '1.5rem',
    "&:hover": {
        cursor: 'pointer',
        transform: 'scale(0.95)'
    }
})

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
                <div>You have not added any restaurant !</div>
                <div><Button onClick={openModal}>Add Restaurant</Button></div>
                <PopUpModal open={open} handleClose={closeModal}/>
            </Child>
            <Image />
        </Container>
    );
};

export default NoRestaurantAdded;

