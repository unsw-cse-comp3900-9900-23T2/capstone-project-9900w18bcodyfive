import React from "react";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

import FormInput from "../components/FormInput";
import LoginBg from '../assets/images/Login-Bg.jpg';

const BackgroundContainer = styled('div')({
    backgroundImage: `url(${LoginBg})`,
    backgroundSize: 'cover',
    padding: '2rem',
    height: '100vh'
});

const FormContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20vh',
    flexDirection: 'column'
});

const Form = styled('form')({
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
    padding: '20px 60px',
    borderRadius: '10px',
    background: '#ffe6e6',
});

const Submit = styled('button')({
    width: '100%',
    height: '50px',
    backgroundColor: '#006600',
    color: 'white',
    borderRadius: '10px',
    fontSize: '1.5rem',
    cursor:'pointer',
    marginTop: '1rem',

});

const LogIn = () => {
    const [values, setValues] = React.useState({
        email:"",
        password:""
    });

    const inputs = [
        {
            id:1,
            name:"email",
            type:"email", // performs the work of the regex in the email field
            placeholder:"Email",
            errorMessage:"Please enter a valid email",
            label:"Email",
            required:true
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"",
            label:"Password",
            required:true
        }
    ];
    const onChange = (e) =>{
        setValues({ ...values, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(values)
    }
    return(
        <BackgroundContainer>
            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <h2 style={{color:'#006600'}}>Login Here</h2>
                    {inputs.map((input) =>{
                        return(
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        );
                    })}
                    <Submit>Login</Submit>
                </Form>
                <Link to="/register">Not yet a user? Sign up now</Link>
            </FormContainer>
        </BackgroundContainer>
    );
}

export default LogIn;