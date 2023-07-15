import React from "react";
import styled from "@emotion/styled";

//Components Import
import EditRestaurant from "./EditRestaurant";
import EditRestaurantImage from "./EditRestaurantImage";

const RestaurantAdded = (props) => {
    const [open, setOpen] = React.useState(false);
    const [editImage, setEditImage] = React.useState(false);
    const openEditImage = ()=>{
        setEditImage(true);
    }
    const closeEditImage = ()=>{
        setEditImage(false);
    }
    const openModal = ()=>{
        setOpen(true);
    };
    const closeModal = ()=>{
        setOpen(false);
    };
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
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '2rem',
        margin: '2rem',
        backgroundColor: 'white'
    });
    
    const Image = styled('div')({
        border: '5px solid #006600',
        backgroundImage: `url(${props.res.rImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flex: '1',
        borderRadius: '2rem',
        margin: '2rem'
    })
    const Button = styled('button')({
        color: 'white',
        borderRadius: '5rem',
        backgroundColor: 'green',
        width: '20rem',
        height: '3rem',
        fontSize: '1.5rem',
        marginTop: '1.5rem',
        "&:hover": {
            cursor: 'pointer',
            transform: 'scale(0.95)'
        }
    })
    const SubHeading = styled('div')({
        fontFamily: 'Nunito',
        fontSize: '2rem',
        color: 'green',
        textAlign: 'left',
        fontWeight: 'bold',
        margin: '1rem'
    })

    const Content = styled('div')({
        fontFamily: 'Nunito',
        fontSize: '2rem',
        textAlign: 'left',
        border: '2px solid black',
        borderRadius: '1rem',
        padding: '0.75rem'
    })

    const Heading = styled('div')({
        fontFamily: 'Nunito',
        fontSize: '3rem',
        color: 'green',
        textAlign: 'left',
        fontWeight: 'bold',
        margin: '1rem'
    })

    const ButtonContainer = styled('div')({
        display: 'flex',
        justifyContent: 'space-evenly'
    })
    return(
        <Container>
            <Child>
                <Heading>Your Restaurant...</Heading>
                <SubHeading>Name</SubHeading>
                <Content>{props.res.rName}</Content>
                <SubHeading>Description</SubHeading>
                <Content>{props.res.rDescription}</Content>
                <SubHeading>Location</SubHeading>
                <Content>{props.res.rLocation}</Content>
                <SubHeading>Contact</SubHeading>
                <Content>{props.res.rContact}</Content>
                <SubHeading>Table Count</SubHeading>
                <Content>{props.res.rTableCount}</Content>
                <ButtonContainer>
                    <Button onClick={openModal}>Edit Restaurant Details</Button>
                    <Button onClick={openEditImage}>Edit Restaurant Picture</Button>
                </ButtonContainer>
                <EditRestaurant open={open} res={props.res} handleClose={closeModal}/>
                <EditRestaurantImage open={editImage} res={props.res} handleClose={closeEditImage}/>
            </Child>
            <Image />
        </Container>
    );
}

export default RestaurantAdded;