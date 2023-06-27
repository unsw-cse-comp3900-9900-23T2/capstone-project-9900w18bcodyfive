import React from 'react';
import styled from '@emotion/styled';
import '../custom_css/FormInput.css'

const Container = styled('div')({
    display:'flex',
    flexDirection:'column',
    width: '500px',
    fontFamily: 'Nunito',
});


const FormInput = (props) =>{
    const [isFocused, setIsFocused] = React.useState(false);

    //Assigned label, onChange, id to respective variables and kept the remaining properties of 
    // Props in another object called ...inputProps
    const { label, errorMessage, onChange, id, ...inputProps } = props;
    return(
        <Container>
            <label style={{ fontSize: '1.2rem', textAlign: 'left'}}>{label}</label>
            <input className='formInput'
                {...inputProps} 
                onChange = {onChange}
                
                onBlur = {(e)=>{setIsFocused(true)}} // onBlur -> clicking inside the element and clicking outside somewhere else
                // If you notice the onBlur won't work for confirmpassword because the we are going to click submit button stratight away after typing the confirm password field 
                // This will result in error after the pressing submit this is not a desired behaviour
                // To pevent it we are going to use "onFocus" which means just clicking the field it does not wait till we click somewhere else
                // OnFocus will only be used for confirm password field for other field onBlur will be used
                onFocus = {()=>{inputProps.name === "confirmPassword" && setIsFocused(true)}}
                focused  = {isFocused.toString()} //converting the isFocused state value to string and assigning it to the property called focused  which will then be used in the css for consitional rendering of error messages
            />
            <span className='errorMessage '>{errorMessage}</span>
        </Container>
    );
}

export default FormInput;