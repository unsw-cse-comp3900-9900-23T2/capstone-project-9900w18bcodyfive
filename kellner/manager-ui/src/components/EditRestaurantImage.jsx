// Library imports
import React from "react";
import { Dialog } from "@mui/material";
import styled from "@emotion/styled";

// Component Imports
import FormInput from "./FormInput";
import { fileToDataUrl } from "./fileToDataUrl";
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


const EditRestaurantImage = (props)=>{
    const [loading, setLoading] = React.useState(false);
    const token = useSelector(state => state.manager.token)
    const [values, setValues] = React.useState({
        resId: props.res.resId,
        rName:props.res.rName,
        rDescription: props.res.rDescription,
        rLocation: props.res.rLocation,
        rContact: props.res.rContact,
        rTableCount: props.res.rTableCount,
        rImage:'',
    });

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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await fileToDataUrl(file);
        setValues({ ...values, [e.target.name]: base64 })
    };

    const onChange = (e) =>{
        handleFileUpload(e);
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        editRestaurant();
    }

    const input = {
            id:3,
            name:"rImage",
            type:"file",
            placeholder:"please upload an image of your restaurant",
            errorMessage:"Please upload an image",
            label:"Restaurant Image",
            required:true
        }

    return(
        <Dialog open={props.open}>
            {loading === false ? (
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <h2 style={{color:'#006600'}}>Edit your Restaurant Profile Picture</h2>
                            <FormInput {...input} onChange={onChange}/>
                        <ButtonContainer>
                            <StyledButton style={{backgroundColor: 'red'}} onClick={props.handleClose}>Cancel</StyledButton>
                            <StyledButton style={{backgroundColor: '#006600'}}>Submit</StyledButton>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            ):(
                <Dialog open={loading} sx={{opacity:'0.65'}}>
                    <img src={Loading} alt={'Loading'}/>
                </Dialog>
            )}
        </Dialog>
    );
}

export default EditRestaurantImage;