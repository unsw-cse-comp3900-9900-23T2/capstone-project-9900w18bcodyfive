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

const EditCategory = (props)=>{
    const cat = props.cat;
    const [loading, setLoading] = React.useState(false);
    const token = useSelector(state => state.manager.token);
    const rId = cat.rId;
    const [values, setValues] = React.useState({
        cName: cat.cName,
        cDescription: cat.cDescription,
        cType:cat.cType,
        cImage:cat.cImage
    });
    const handleClose = (e)=>{
        e.preventDefault();
        setLoading(false);
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
        },
        {
            id:2,
            name:"cDescription",
            type:"text",
            placeholder:"Add a short description about your category",
            errorMessage:"Please enter the description",
            label:"Category Description",
        },
        {
            id:3,
            name:"cType",
            type:"text",
            placeholder:"Please enter the the type of your category",
            errorMessage:"Please enter the type of category",
            label:"Type",
        },
        {
            id:4,
            name:"cImage",
            type:"file",
            placeholder:"please upload an image of your restaurant",
            errorMessage:"Please upload an image",
            label:"Restaurant Image (upload a new file if you want to change)",
        },
    ];

    async function editCategory() {
        const response = await fetch(`http://localhost:5000/api/editCategory/${rId}/${cat.cId}`, {
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
        // Check if the image is not editted
        if(values.cImage === ''){
            values.cImage = props.cat.cImage;
        }
        console.log(values);
        editCategory();
    }
    return(
        <Dialog open={props.open}>
        {loading===false ?(
            <FormContainer>
            <Form>
                <h2 style={{color:'#006600'}}>Only fill the fields which you want to change</h2>
                {inputs.map((input) =>{
                    if(input.name === "cImage"){
                        return(
                            <FormInput key={input.id} {...input} onChange={onChange}/>
                        );
                    } else if(input.name === "cType") {
                        return(
                            <div key={input.id} >
                                <label style={{ fontSize: '1.2rem', textAlign: 'left'}}>Slect a new type if you want to change the old one</label>
                                <select onChange={onChange}  name="cType" className='formInput'>
                                    <option value=''>Select one Type</option>
                                    <option value='BreakFast'>BreakFast</option>
                                    <option value='Lunch'>Lunch</option>
                                    <option value='Dinner'>Dinner</option>
                                    <option value='Snacks'>Snacks</option>
                                    <option value='Beverages'>Beverages</option>
                                </select>
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
                    <StyledButton style={{backgroundColor: '#006600'}} onClick={handleSubmit}>Submit</StyledButton>
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

export default EditCategory;