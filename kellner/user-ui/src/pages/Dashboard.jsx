import React from "react";
import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

// Component Imports
import Header from "../components/Header";
import Categories from "../components/Categories";
import Loading from "../assets/images/Loading.gif";
import Items from "../components/Items";

// Redux Imports
import { useSelector } from "react-redux";

const WelcomeMessage = styled('div')({
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    marginTop: '12rem',
    fontSize: '3rem',
    alignItems: 'flex-start'
});

const Heading = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '4rem',
    color:'white'

});
const Container1 = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem',
    
});
const Dashboard = ()=>{
    const rId = useSelector(state=>state.restaurant.rId);
    const rName = useSelector(state=>state.restaurant.rName);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({
        cat:'',
        rand:''
    });

    React.useEffect(()=>{
        //Function to fetch the dashboard
        async function getUserDashboard(){
            const response = await fetch(`http://localhost:5000/api/getUserDashboard/${rId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
        
            const data = await response.json();
            if(response.status === 200){
                let temp ={
                    cat: data.category,
                    rand: data.item
                };
                setData(temp);
                setLoading(false);
            }
        }
        getUserDashboard();
    },[rId]);
    return(
        <>
        {loading === false ?(
            <>
                <Header/>
                <WelcomeMessage>
                    Welcome to {rName}
                </WelcomeMessage>
                <Heading>
                    <div style={{backgroundColor: 'green', width:'80%', borderRadius: '0.5rem'}}>
                        Categories
                    </div>
                </Heading>
                <Container1>
                    <Categories categories={data.cat}/>
                </Container1>
                <Heading>
                    <div style={{backgroundColor: 'green', width:'80%', borderRadius: '0.5rem'}}>
                        Popular Items
                    </div>
                </Heading>
                <Container1>
                    <Items items={data.rand}/>
                </Container1>
            </>
        ) : (
            <Dialog open={loading} sx={{opacity:'0.65'}}>
                <img src={Loading} alt={'Loading'}/>
            </Dialog>
        )}
        </>
    );
}

export default Dashboard;