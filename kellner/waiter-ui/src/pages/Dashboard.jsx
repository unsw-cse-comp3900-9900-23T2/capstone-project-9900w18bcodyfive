import React from "react";
import styled from "@emotion/styled";
import { Divider } from "@mui/material";

// components import
import Header from "../components/Header";
import ReadyToServe from "../components/ReadyToServe";
import Assistance from "../components/Assistance";
import Checkout from "../components/Checkout";

//redux imports
import { useSelector } from "react-redux";

const MasterContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '10rem'
});

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    border: '2px solid black',
    margin: '1rem',
    borderRadius: '2rem'
});

const Heading = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '2rem',
    fontWeight: 'bold',
    backgroundColor: '#949db8',
    padding: '1rem',
    borderRadius: '1rem',
    margin: '2rem'
});

const Dashboard = ()=>{
    const rId = useSelector(state => state.restaurant.rId);
    const [requests, setRequests] = React.useState({
        assistanceRequests: [],
        checkOutRequests: [],
        readyToServeOrders: []
    });

    React.useEffect(()=>{
        //Function to get list of orders
        async function getAllRequests(){
            const response = await fetch(`http://localhost:5000/api/getAllRequests/${rId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })

            const data = await response.json();
            if(response.status === 200){
                setRequests({
                    assistanceRequests: data.assistanceRequests,
                    checkOutRequests: data.checkOutRequests,
                    readyToServeOrders: data.readyToServeOrders
                });
            }
        }

        async function wrap(){
            setInterval(getAllRequests, 3000);
        };
        wrap();
    },[rId])
    return(
        <>
            <Header/>
            <MasterContainer>
                <Container>
                    <Heading>Ready To Serve</Heading>
                    <Divider/>
                    {requests.readyToServeOrders.map((order, index)=>{
                        return(
                            <ReadyToServe key={index} order={order}/>
                        );
                    })}
                </Container>
                <Divider orientation="vertical" sx={{height: '100vh'}}/>
                <Container>
                    <Heading>Assistance Requests</Heading>
                    <Divider/>
                    {requests.assistanceRequests.map((request, index)=>{
                        return(
                            <Assistance key={index} request={request}/>
                        );
                    })}
                </Container>
                <Divider orientation="vertical" sx={{height: '100vh'}}/>
                <Container>
                    <Heading>Checkout Requests</Heading>
                    <Divider/>
                    {requests.checkOutRequests.map((request, index)=>{
                        return(
                            <Checkout key={index} request={request}/>
                        );
                    })}
                </Container>
            </MasterContainer>
        </>
    );
}

export default Dashboard;