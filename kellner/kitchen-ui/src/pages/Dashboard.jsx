import React from "react";
import styled from "@emotion/styled";

//component imports
import Header from "../components/Header";
import Order from "../components/Order";

//redux imports
import { useSelector } from "react-redux";

const MasterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8rem',
    fontFamily: 'Nunito',
    fontSize: '2rem',
});


const Dashboard = ()=>{
    const rId = useSelector(state => state.restaurant.rId);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(()=>{
        //Function to get list of orders
        async function getAllOrders(){
            const response = await fetch(`http://localhost:5000/api/getKitchenOrders/${rId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })

            const data = await response.json();
            if(response.status === 200){
                setOrders(data);
            }
        }
        async function wrap(){
            setInterval(getAllOrders, 2000);
        };

        wrap();
    },[rId])
    return(
        <>
            <Header/>
            <MasterContainer>
                    {orders.map((order, index)=>{
                        return(
                            <Order order={order} key={index}/>
                        );
                    })}
            </MasterContainer>
        </>
    );
}

export default Dashboard;