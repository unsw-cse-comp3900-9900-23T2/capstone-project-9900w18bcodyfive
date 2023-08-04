// Library imports
import React from "react";
import { Dialog } from "@mui/material";
import styled from "@emotion/styled";

// Component imports
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

const AddItems = (props)=>{
    const [loading, setLoading] = React.useState(false);
    const token = useSelector(state => state.manager.token);
    const rId = props.rId;
    const cId = props.cId;
    const [values, setValues] = React.useState({
        iName:"",
        iPrice:"",
        iDescription: "",
        iIngrediens:"",
        iImage:""
    });

    const handleClose = ()=>{
        setValues({
            iName:"",
            iPrice:"",
            iDescription: "",
            iIngrediens:"",
            iImage:""
        });
        props.handleClose();
    };
    const inputs = [
        {
            id:1,
            name:"iName",
            type:"text",
            placeholder:"Item Name",
            errorMessage:"please enter a Item name",
            label:"Item Name",
            required:true
        },
        {
            id:2,
            name:"iDescription",
            type:"text",
            placeholder:"Add a short description about your item",
            errorMessage:"Please enter the description",
            label:"Item Description",
            required:true
        },
        {
            id:3,
            name:"iIngredients",
            type:"text",
            placeholder:"Please enter ingredients",
            errorMessage:"Please enter the ingredients",
            label:"Ingredients",
            required:true
        },
        {
            id:4,
            name:"iImage",
            type:"file",
            placeholder:"please upload an image of your Item",
            errorMessage:"Please upload an image",
            label:"Item Image",
            required:true
        },
        {
            id:5,
            name:"iPrice",
            type:"Number",
            placeholder:"Please enter Price",
            errorMessage:"Please enter the Price",
            label:"Price",
            required:true
        },
    ];

    async function addItems() {
        const response = await fetch(`http://localhost:5000/api/addItems/${rId}/${cId}`, {
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
        if(e.target.name === "iImage"){
            handleFileUpload(e);
        } else {
            setValues({ ...values, [e.target.name]: e.target.value});
        }
    };


    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        addItems();
    }
    return(
        <Dialog open={props.open}>
        {loading===false ?(
            <FormContainer>
            <Form onSubmit={handleSubmit}>
                <h2 style={{color:'#006600'}}>Add Your Category</h2>
                {inputs.map((input) =>{
                    if(input.name === "iImage"){
                        return(
                            <FormInput key={input.id} {...input} onChange={onChange}/>
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

export default AddItems;