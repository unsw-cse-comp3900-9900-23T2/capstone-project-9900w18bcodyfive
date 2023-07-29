import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import {Button} from "@mui/material";
import {Grid} from "@mui/material";

const OrderItems = styled('div')({
    display:'flex',
    flexDirection: 'column',
    border: '2px solid green',
    padding: '1.5rem',
    borderRadius: '1.5rem'
});

const Order = ({order})=>{
    let items = []
    for (const j in order.itemsOrdered){
        items.push(j)
    }
    console.log(order.note)
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
                    <Button variant="contained" color="success" sx={{height: '3rem'}}>Complete</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Order;