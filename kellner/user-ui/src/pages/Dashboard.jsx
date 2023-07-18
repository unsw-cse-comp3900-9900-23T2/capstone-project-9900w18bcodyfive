import React from "react";
import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

// Component Imports
import Header from "../components/Header";
import Categories from "../components/Categories";
import Loading from "../assets/images/Loading.gif"

// Redux Imports
import { useSelector } from "react-redux";

const Container1 = styled('div')({
    display: 'flex',
    marginTop: '10rem',
    justifyContent: 'center'
});
const Dashboard = ()=>{
    const rId = useSelector(state=>state.restaurant.rId);
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({
        cat:'',
        rand:''
    });

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
            console.log(data)
            let temp ={
                cat: data.category,
                rand: data.items
            };
            setData(temp);
            setLoading(false);
        }
    }

    React.useEffect(()=>{
        getUserDashboard();
    },[]);
    return(
        <>
        {loading === false ?(
            <>
                <Header/>
                <Container1>
                    <Categories categories={data.cat}/>
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