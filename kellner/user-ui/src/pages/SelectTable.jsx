import React from "react";
import styled from "@emotion/styled";
import { Slide } from "@mui/material";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

//Component imports
import userWelcome from "../assets/images/userWelcome.gif";
import HomeHeader from "../components/HomeHeader";

//redux imports
import { addTable } from "../redux/slices/tableSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled('div')({
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundImage: `url(${userWelcome})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.75,
    fontFamily: 'Nunito',
});

const WelcomeMessageContainer = styled('div')({
    marginTop: '3rem',
    marginLeft: '5rem',
    fontFamily: 'Nunito',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'left',
});

const StyledSelect = styled('select')({
    padding: '15px',
    borderRadius: '10px',
    margin: '1rem',
    fontSize: '1.1rem',
})

const StyledOption = styled('option')({
    padding: '15px',
    borderRadius: '10px',
    margin: '1rem',
    fontSize: '1.1rem',
    
})

const SelectTable = ()=>{
    const [checked, setChecked] = React.useState(false);
    const [table, setTable] = React.useState('');
    const rName = useSelector(state=>state.restaurant.rName);
    const rTableIds = useSelector(state=> state.restaurant.rTableIds);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to set the restaurant state on change
    const onChange = (e)=>{
        setTable(e.target.value);
    };

    // function to dispatch the action to the redux table slice and navigate to other page
    const finaliseRestaurant = ()=>{
        dispatch(addTable({tId:table}));
    }
    // Triggers the animation everytime the page loads
    React.useEffect(() => {
        setChecked(true);
    },[]);

    return(
        <Container>
            <HomeHeader/>
            <Slide  direction="up" in={checked} {...(checked ? {timeout: 1000} : {}) }collapsedHeight = {50}>
                <WelcomeMessageContainer>
                    <span style={{ fontSize:"3rem"}}>Welcome to <span style={{color:'#006600'}}>{rName}</span></span><br/>
                    Please Select your Table
                    <StyledSelect onChange={onChange}>
                        <StyledOption value=''>Select a Table</StyledOption>
                        {rTableIds.map((tId, index)=>{
                            return(
                                <StyledOption key={index} value={tId}>{tId}</StyledOption>
                            );
                        })}
                    </StyledSelect>
                    <div>
                        <Button variant="contained" color="success" onClick={finaliseRestaurant} sx={{fontSize:'1.15rem'}}>
                            Confirm Restaurant
                        </Button>
                    </div>
                </WelcomeMessageContainer>
            </Slide>
        </Container>
    );
};

export default SelectTable;