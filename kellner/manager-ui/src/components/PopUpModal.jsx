import React from "react";
import { Dialog } from "@mui/material";
import styled from "@emotion/styled";

import FormInput from "./FormInput";

const FormContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}
);

const Form = styled('form')({
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
    padding: '20px 60px',
    borderRadius: '10px',
    background: '#ffe6e6',
});

const ButtonContainer =styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly'
});

const StyledButton = styled('button')({
    width: '30%',
    height: '50px',
    backgroundColor: '#006600',
    color: 'white',
    borderRadius: '10px',
    fontSize: '1.5rem',
    cursor:'pointer',
    marginTop: '1rem',

});

const PopUpModal = (props)=>{
    const [values, setValues] = React.useState({
        restaurantName:"",
        restaurantType:"",
        description: "",
        location:"",
        phoneNumber:"",
        numTables:"",
    });

    const inputs = [
        {
            id:1,
            name:"restaurantName",
            type:"text",
            placeholder:"Restaurant Name",
            errorMessage:"please enter a restaurant name",
            label:"Restaurant Name",
            required:true
        },
        {
            id:2,
            name:"restaurantType",
            type:"text",
            placeholder:"Restaurant Type eg: Cafe, Diner etc.",
            errorMessage:"please enter the type",
            label:"Restaurant Type",
            required:true
        },
        {
            id:3,
            name:"description",
            type:"text",
            placeholder:"Add a short description about your restaurant",
            errorMessage:"Please enter the description",
            label:"Restaurant Description",
            required:true
        },
        {
            id:4,
            name:"location",
            type:"text",
            placeholder:"Enter the Location of your restaurant",
            errorMessage:"Please enter a location",
            label:"Location",
            required:true
        },
        {
            id:5,
            name:"phoneNumber",
            type:"number",
            placeholder:"Enter the phone number",
            errorMessage:"Please enter a phone number",
            label:"Phone Number",
            required:true
        },
        {
            id:6,
            name:"numTables",
            type:"number",
            placeholder:"Enter the number of tables in you restaurant",
            errorMessage:"Please enter number of tables",
            label:"Number of Tables",
            required:true
        }
    ];

    const onChange = (e) =>{
        setValues({ ...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(values)
    }
    return(
        <Dialog open={props.open}>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <h2 style={{color:'#006600'}}>Register Here</h2>
                    {inputs.map((input) =>{
                        return(
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        );
                    })}
                    <ButtonContainer>
                        <StyledButton style={{backgroundColor: 'red'}} onClick={()=>{props.handleClose()}}>Cancel</StyledButton>
                        <StyledButton style={{backgroundColor: '#006600'}}>Submit</StyledButton>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </Dialog>
    );
}

export default PopUpModal;