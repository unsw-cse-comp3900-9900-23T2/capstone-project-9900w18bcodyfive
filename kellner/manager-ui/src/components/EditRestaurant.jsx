// Library Imports
import React from "react";
import { Dialog } from "@mui/material";
import styled from "@emotion/styled";

// Component Imports
import FormInput from "./FormInput";
import Loading from "../assets/images/Loading.gif";

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

const EditRestaurant = (props)=>{
    const [loading, setLoading] = React.useState(false);
    const token = useSelector(state => state.manager.token);
    const closeModal = ()=>{props.handleClose()}
    const [values, setValues] = React.useState({
        resId: props.res.resId,
        rName:props.res.rName,
        rDescription: props.res.rDescription,
        rLocation: props.res.rLocation,
        rContact: props.res.rContact,
        rTableCount: props.res.rTableCount,
        rImage: props.res.rImage,
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
            name:"rLocation",
            type:"text",
            placeholder:"Enter the Location of your restaurant",
            errorMessage:"Please enter a location",
            label:"Location",
            required:true
        },
        {
            id:4,
            name:"rContact",
            type:"text",
            placeholder:"Enter the phone number",
            errorMessage:"Please enter a phone number",
            label:"Phone Number",
            required:true
        },
        {
            id:5,
            name:"rTableCount",
            type:"number",
            placeholder:"Enter the number of tables in you restaurant",
            errorMessage:"Please enter number of tables",
            label:"Number of Tables",
            required:true
        }
    ];

    async function editRestaurant() {
        const response = await fetch('http://localhost:5000/api/editRestaurant', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'authorization': `bearer ${token}`
            },
            body : JSON.stringify(values)
        })

        const data = await response.json();
        if (response.status === 200){
            setLoading(false);
            window.location.reload();
        } else {
            console.log(data.errorMessage);
            window.alert(data.errorMessage);
        }
    }

    
    const onChange = (e) =>{
        setValues({ ...values, [e.target.name]: e.target.value});
    };


    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        editRestaurant();
    }
    return(
        <Dialog open={props.open}>
            {loading === false ? (
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <h2 style={{color:'#006600'}}>Edit Restaurant Details</h2>
                        {inputs.map((input) =>{
                            return(
                                <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            );
                        })}
                        <ButtonContainer>
                            <StyledButton style={{backgroundColor: 'red'}} onClick={closeModal}>Cancel</StyledButton>
                            <StyledButton style={{backgroundColor: '#006600'}}>Submit</StyledButton>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            ): (
                <Dialog open={loading} sx={{opacity:'0.65'}}>
                    <img src={Loading} alt={'Loading'}/>
                </Dialog>
            )}
        </Dialog>
    );
}

export default EditRestaurant;