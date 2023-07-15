import React from 'react';
import styled from "@emotion/styled";
import { Button } from "@mui/material";

//components import
import configureMenu from "../assets/images/configureMenu.gif";
import AddCategories from './AddCategory';

// custom css input
import '../custom_css/FormInput.css';

const MasterContainer = styled('div')({
    display: 'flex',
    fontFamily: 'Nunito',
    fontSize: '2rem',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2rem',
    alignItems: 'center'
});

const Content = styled('div')({
    fontWeight: 'bold',
    flex: '2',
});

const NoCategories = (props)=>{
    const [open, setOpen] = React.useState(false);

    //Open add category popup
    const handleOpen = ()=>{
        setOpen(true);
    }

    // Close add category popup
    const handleClose = ()=>{
        setOpen(false);
    }
    return(
        <MasterContainer>
            <Content>
                No categories added. <br/>
                You can configure categories in one easy step <br/>
                <Button variant="contained" color="success" sx={{fontSize: '1.2rem', margin:'2rem'}} onClick={handleOpen}>Click Here</Button>
                <AddCategories open={open} res={props.res} handleClose={handleClose}/>
            </Content>
            <div  style={{ flex: '1'}}>
                <img src={configureMenu} alt={"No catgory added"} style={{borderRadius: '2rem'}}/>
            </div>
        </MasterContainer>
    );
}

export default NoCategories;