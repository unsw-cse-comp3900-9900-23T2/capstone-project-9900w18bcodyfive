import React from "react";
import { Dialog } from "@mui/material";
import styled from "@emotion/styled";

import FormInput from "./FormInput";
import { fileToDataUrl } from "./fileToDataUrl";

//Redux Imports
import { useSelector } from "react-redux/es/hooks/useSelector";

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
    const token = useSelector(state => state.manager.token)
    const closeModal = ()=>{props.handleClose()}
    const [values, setValues] = React.useState({
        rName:"",
        rDescription: "",
        rLocation:"",
        rContact:"",
        rTableCount:"",
        rImage:""
    });

    const inputs = [
        {
            id:1,
            name:"rName",
            type:"text",
            placeholder:"Restaurant Name",
            errorMessage:"please enter a restaurant name",
            label:"Restaurant Name",
            required:true
        },
        {
            id:2,
            name:"rDescription",
            type:"text",
            placeholder:"Add a short description about your restaurant",
            errorMessage:"Please enter the description",
            label:"Restaurant Description",
            required:true
        },
        {
            id:3,
            name:"rImage",
            type:"file",
            placeholder:"please upload an image of your restaurant",
            errorMessage:"Please upload an image",
            label:"Restaurant Image",
            required:true
        },
        {
            id:4,
            name:"rLocation",
            type:"text",
            placeholder:"Enter the Location of your restaurant",
            errorMessage:"Please enter a location",
            label:"Location",
            required:true
        },
        {
            id:5,
            name:"rContact",
            type:"text",
            placeholder:"Enter the phone number",
            errorMessage:"Please enter a phone number",
            label:"Phone Number",
            required:true
        },
        {
            id:6,
            name:"rTableCount",
            type:"number",
            placeholder:"Enter the number of tables in you restaurant",
            errorMessage:"Please enter number of tables",
            label:"Number of Tables",
            required:true
        }
    ];

    async function addRestaurant() {
        const response = await fetch('http://localhost:5000/api/createRestaurant', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `bearer ${token}`
            },
            body : JSON.stringify(values)
        })

        const data = await response.json();
        if (response.status === 200){
            console.log(data);
            window.location.reload();
        } else {
            console.log(data.errorMessage);
            window.alert(data.errorMessage);
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await fileToDataUrl(file);
        console.log(base64)
        setValues({ ...values, [e.target.name]: base64 })
    };
    
    const onChange = (e) =>{
        if(e.target.name === "rImage"){
            handleFileUpload(e);
        } else {
            setValues({ ...values, [e.target.name]: e.target.value});
        }
    };


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(values);
        addRestaurant();
    }
    return(
        <Dialog open={props.open}>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <h2 style={{color:'#006600'}}>Add Your Restaurant Details</h2>
                    {inputs.map((input) =>{
                        if(input.name === "rImage"){
                            return(
                                <FormInput key={input.id} {...input} onChange={onChange}/>
                            );
                        } else {
                            return(
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            );
                        }
                    })}
                    <ButtonContainer>
                        <StyledButton style={{backgroundColor: 'red'}} onClick={closeModal}>Cancel</StyledButton>
                        <StyledButton style={{backgroundColor: '#006600'}}>Submit</StyledButton>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </Dialog>
    );
}

export default PopUpModal;