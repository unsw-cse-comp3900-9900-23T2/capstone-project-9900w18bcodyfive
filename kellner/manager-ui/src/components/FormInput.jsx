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
    //Assigned label, onChange, id to respective variables and kept the remaining properties of 
    // Props in another object called ...inputProps
    const { label, errorMessage, onChange, id, ...inputProps } = props;
    return(
        <Container>
            <label style={{ fontSize: '1.2rem', textAlign: 'left'}}>{label}</label>
            <input className='formInput'
                {...inputProps} 
                onChange={onChange}
            />
            <span className='errorMessage'>{errorMessage}</span>
        </Container>
    );
}

export default FormInput;