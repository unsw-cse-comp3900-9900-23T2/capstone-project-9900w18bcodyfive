import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import {Button} from "@mui/material";
import {Grid} from "@mui/material";

//redux imports
import { useSelector } from "react-redux";

const OrderItems = styled('div')({
    display:'flex',
    flexDirection: 'column',
    border: '2px solid green',
    padding: '1.5rem',
    borderRadius: '1.5rem'
});

const Order = ({order})=>{
    const rId = useSelector(state => state.restaurant.rId);
    const orderNo = order.orderNo;
    let items = []

    for (const j in order.itemsOrdered){
        items.push(j)
    }

    //function to serve the finished order
    async function finishCooking() {
        const response = await fetch(`http://localhost:5000/api/deleteKitchenOrder/${rId}/${orderNo}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const data = await response.json();
        if (response.status === 200){
            window.location.reload();
        } else {
            console.log(data.errorMessage);
            window.alert(data.errorMessage);
        }
    }
    return(
        <Paper sx={{ margin:'2rem', borderRadius: '1rem', backgroundColor: '#ffe6ff'}}>
            <Grid container alignItems={"center"}>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <div>{order.tId}</div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <OrderItems>
                    {items.map((item, index)=>{
                        return(
                            <div key={index}>{item} : {order.itemsOrdered[item]}</div>
                        );
                    })}
                    </OrderItems>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    {(order.note !== "") ? (
                            <div style={{fontWeight: 'bold', color:'red'}}>{order.note}</div>
                    ):(<></>)}
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Button variant="contained" color="success" sx={{height: '3rem'}} onClick={finishCooking}>Complete</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Order;