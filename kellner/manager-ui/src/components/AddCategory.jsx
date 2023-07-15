import React from "react";
import { Dialog } from "@mui/material";
import styled from "@emotion/styled";

import FormInput from "./FormInput";
import { fileToDataUrl } from "./fileToDataUrl";
import Loading from "../assets/images/Loading.gif"

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

const AddCategories = (props)=>{
    const [loading, setLoading] = React.useState(false);
    const token = useSelector(state => state.manager.token);
    const rId = props.res.resId;
    const [values, setValues] = React.useState({
        cName:"",
        cDescription: "",
        cType:"",
        cImage:""
    });
    const [isRequired, setIsRequired] = React.useState(false);
    const handleClose = ()=>{
        setIsRequired(false);
        props.handleClose();
    };
    const inputs = [
        {
            id:1,
            name:"cName",
            type:"text",
            placeholder:"Category Name",
            errorMessage:"please enter a category name",
            label:"Category Name",
            required:true
        },
        {
            id:2,
            name:"cDescription",
            type:"text",
            placeholder:"Add a short description about your category",
            errorMessage:"Please enter the description",
            label:"Category Description",
            required:true
        },
        {
            id:3,
            name:"cType",
            type:"text",
            placeholder:"Please enter the the type of your category",
            errorMessage:"Please enter the type of category",
            label:"Type",
            required:true
        },
        {
            id:4,
            name:"cImage",
            type:"file",
            placeholder:"please upload an image of your restaurant",
            errorMessage:"Please upload an image",
            label:"Restaurant Image",
            required:true
        },
    ];

    async function addCategory() {
        const response = await fetch(`http://localhost:5000/api/addCategory/${rId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `bearer ${token}`
            },
            body : JSON.stringify(values)
        })
        const data = await response.json();
        if (response.status === 200){
            setLoading(false);
            console.log(data);
            window.location.reload();
        } else {
            setLoading(false);
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
        if(e.target.name === "cImage"){
            handleFileUpload(e);
        } else {
            setValues({ ...values, [e.target.name]: e.target.value});
        }
    };


    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        console.log(rId)
        console.log(values);
        addCategory();
    }
    return(
        <Dialog open={props.open}>
        {loading===false ?(
            <FormContainer>
            <Form onSubmit={handleSubmit}>
                <h2 style={{color:'#006600'}}>Add Your Restaurant Details</h2>
                {inputs.map((input) =>{
                    if(input.name === "cImage"){
                        return(
                            <FormInput key={input.id} {...input} onChange={onChange}/>
                        );
                    } else if(input.name === "cType") {
                        return(
                            <div key={input.id} >
                                <label style={{ fontSize: '1.2rem', textAlign: 'left'}}>{input.label}</label>
                                <select onChange={onChange}  name="cType" className='formInput' onBlur = {(e)=>{setIsRequired(true)}} focused  = {isRequired.toString()} required={isRequired}>
                                    <option value=''>Select one Type</option>
                                    <option value='BreakFast'>BreakFast</option>
                                    <option value='Lunch'>Lunch</option>
                                    <option value='Dinner'>Dinner</option>
                                    <option value='Snacks'>Snacks</option>
                                    <option value='Beverages'>Beverages</option>
                                </select>
                                <span className='errorMessage '>{input.errorMessage}</span>
                            </div>
                        );
                    }else {
                        return(
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        );
                    }
                })}
                <ButtonContainer>
                    <StyledButton style={{backgroundColor: 'red'}} onClick={handleClose}>Cancel</StyledButton>
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

export default AddCategories;