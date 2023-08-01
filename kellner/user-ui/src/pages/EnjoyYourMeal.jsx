import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import {Dialog} from "@mui/material";

// component imports
import enjoyYourMeal from "../assets/images/enjoyYourMeal.gif";
import CheckoutHeader from "../components/checkoutHeader";

//redux imports
import { useSelector } from "react-redux";

const Container = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    margin:'2rem'
});

const Heading = styled('div')({
    fontSize: '3rem',
    fontWeight: 'bold'
});

const Content = styled('div')({
    fontSize: '2rem'
});

const Input = styled('input')({
    border: '1.5px solid #5c5c8a',
    width: '500px',
    height: '40px',
    borderRadius: '10px',
    fontFamily: 'Nunito',
    fontSize: '1.3rem',
    padding: '0.25rem'
});

const EnjoyYourMeal = ()=>{
    const rId = useSelector(state => state.restaurant.rId);
    const tId = useSelector(state => state.table.tId);
    const [open, setOpen] = React.useState(false);
    const [note, setNote] = React.useState("");

    const openAssitanceDialog = ()=>{
        setOpen(true);
    }

    const closeAssitanceDialog = ()=>{
        setNote("");
        setOpen(false);
    }

    const recordNote = (e)=>{
        setNote(e.target.value);
    };

    //function to post notes
    async function callForAssistance() {
        const response = await fetch(`http://localhost:5000/api/sendAssistanceRequest`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body : JSON.stringify({
                rId: rId,
                tId: tId,
                note: note
            })
        })
        const data = await response.json();
        if (response.status === 200){
            setNote("");
            window.alert(data.successMessage)
            setOpen(false);
        } else {
            window.alert(data.errorMessage);
        }
    }

    return(
        <>
            <CheckoutHeader/>
            <Container style={{marginTop: '9rem'}}><Heading>Enjoy Your meal</Heading></Container>
            <Container><Content>Want Any Assistance Click the Button Below</Content></Container>
            <Container><Button variant="contained" color="success" style={{fontSize:'1.2rem'}} onClick={openAssitanceDialog}>Call for Assistance</Button></Container>
            <img src={enjoyYourMeal} alt={'enjoy you meal greetings'} style={{height:'500px', borderRadius:'2rem'}}/>
            <Dialog open={open}>
                <Container><Content>If you want to add any note add it in the input field below, otherwise simply click the submit button</Content></Container>
                <Container><Input value={note} onChange={recordNote}/></Container>
                <Container style={{justifyContent:'space-evenly'}}>
                    <Button color="error" variant="contained" onClick={closeAssitanceDialog}>Cancel</Button>
                    <Button color="success" variant="contained" onClick={callForAssistance}>Submit</Button>
                </Container>
                
            </Dialog>
        </>
    );
};

export default EnjoyYourMeal;