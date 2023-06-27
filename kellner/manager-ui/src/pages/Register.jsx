import React from "react";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

import FormInput from "../components/FormInput";
import LoginBg from '../assets/images/Login-Bg.jpg';

const BackgroundContainer = styled('div')({
    backgroundImage: `url(${LoginBg})`,
    backgroundSize: 'cover',
    padding: '2rem',
});

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

const Register = ()=>{
    const [values, setValues] = React.useState({
        username:"",
        email:"",
        birthday:"",
        password:"",
        confirmPassword:""
    });

    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Username",
            errorMessage:"Username should be 3 to 6 characters and shoudn't include any special character",
            label:"Username",
            pattern:"^[A-Za-z0-9]{3,16}$",
            required:true
        },
        {
            id:2,
            name:"email",
            type:"email", // performs the work of the regex in the email field
            placeholder:"Email",
            errorMessage:"Please enter a valid email address",
            label:"Email",
            required:true
        },
        {
            id:3,
            name:"birthday",
            type:"date",
            placeholder:"Birthday",
            errorMessage:"",
            label:"Birthday",
            required:true
        },
        {
            id:4,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"Passwords should be 8 - 20 characters and it should include atleast one letter, one number and one special character",
            label:"Password",
            pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required:true
        },
        {
            id:5,
            name:"confirmPassword",
            type:"password",
            placeholder:"Confirm Password",
            errorMessage:"Passwords don't match",
            label:"Confirm Password",
            pattern: values.password,
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
                    <h2 style={{color:'#006600'}}>Register Here</h2>
                    {inputs.map((input) =>{
                        return(
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        );
                    })}
                    <Submit>Submit</Submit>
                </Form>
                <Link to="/login">Already a user? Sign in now</Link>
            </FormContainer>
        </BackgroundContainer>
    );
}

export default Register;