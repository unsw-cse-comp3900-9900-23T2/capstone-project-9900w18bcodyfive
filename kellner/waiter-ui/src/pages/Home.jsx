import React from "react";
import styled from "@emotion/styled";
import { Slide } from "@mui/material";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

//Component imports
import waiterBackground from "../assets/images/waiterBackground.jpg"
import HomeHeader from "../components/HomeHeader";

//redux imports
import { addRestaurant} from "../redux/slices/restaurantSlice";
import { useDispatch } from "react-redux";

const Container = styled('div')({
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundImage: `url(${waiterBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.95,
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

const Home = ()=>{
    const [checked, setChecked] = React.useState(false);
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [restaurant, setRestaurant] = React.useState({
        rId:'',
        rName: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Function to get all the restaurants
    async function getAllRestaurants(){
        const response = await fetch('http://localhost:5000/api/getAllRestaurants', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
    
        const data = await response.json();
        if(response.status === 200){
            setRestaurantList(data.restaurants);
        }
    }
    
    

    // function to set the restaurant state on change
    const onChange = (e)=>{
        let temp = {
            rId:'',
            rName:'',
        }
        for (const res in restaurantList){
            if(e.target.value === restaurantList[res].rName){
                temp.rId = restaurantList[res].resId;
                temp.rName = restaurantList[res].rName;
                setRestaurant(temp);
            }
        }
    };

    // function to dispatch the action to the redux restaurant slice and navigate to other page
    const finaliseRestaurant = ()=>{
        dispatch(addRestaurant({
            rId:restaurant.rId,
            rName: restaurant.rName,
            rTableIds: restaurant.rTableIds
        }));
        navigate('/dashboard');
    }
    // Triggers the animation everytime the page loads
    React.useEffect(() => {
        getAllRestaurants();
        setChecked(true);
    },[]);

    return(
        <Container>
            <HomeHeader/>
            <Slide  direction="up" in={checked} {...(checked ? {timeout: 1000} : {}) }collapsedHeight = {50}>
                <WelcomeMessageContainer>
                    <span style={{ fontSize:"3rem"}}>Welcome to <span style={{color:'#006600'}}>Kell</span>ner.</span><br/>
                    Please Choose your restaurant
                    <StyledSelect onChange={onChange}>
                        <StyledOption value=''>Select a Restaurant</StyledOption>
                        {restaurantList.map((restaurant, index)=>{
                            return(
                                <StyledOption key={index} value={restaurant.rName}>{restaurant.rName}</StyledOption>
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

export default Home;