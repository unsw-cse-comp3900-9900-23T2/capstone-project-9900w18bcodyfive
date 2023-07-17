import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

//Componenets import
import noContentAdded from "../assets/images/noContentAdded.jpg"
import AddItems from "./AddItems";

const Container = styled('div')({
    display:'flex',
    margin:'3rem',
    flexDirection: 'column'
});

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '2rem',
    textAlign: 'left',
    margin: '3rem',
    fontWeight: 'bold'
});

const NoItemsAdded = (props)=>{
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
            <img src={noContentAdded} alt={'No items added'} style={{width: '800px'}}/>
            <Content>
                You have not added any items. You can add easily by clicking the button below. <br/><br/>
                <Button variant="contained" color="success" sx={{fontSize:'1.25rem'}} onClick={handleOpen}>Add Items</Button>
                <AddItems open={open} rId={props.rId} cId={props.cId} handleClose={handleClose}/>
            </Content>
        </Container>
    );
};

export default NoItemsAdded;