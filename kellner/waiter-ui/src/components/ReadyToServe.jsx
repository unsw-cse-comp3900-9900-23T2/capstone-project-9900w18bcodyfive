import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import {Button} from "@mui/material";

// redux imports
import { useSelector } from "react-redux";

const MasterContainer = styled('div')({
    display:'flex',
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
    alignItems: 'center',
    margin: '1rem',
    justifyContent: 'space-evenly',
    borderRadius: '1rem'
});

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});
const ReadyToServe = ({order})=>{
    const orderNo = order.orderNo;
    const rId = useSelector(state => state.restaurant.rId);
    let items = [];

    //Extracting the list of items ordered
    for (const i in order.itemsOrdered) {
        items.push(i);
    }

    //function to serve the order which is already delivered to the table
    async function deliverToTable() {
        const response = await fetch(`http://localhost:5000/api/deleteWaitStaffOrder/${rId}/${orderNo}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const data = await response.json();
        if (response.status === 200){
            console.log(data);
        } else {
            console.log(data.errorMessage);
            window.alert(data.errorMessage);
        }
    }

    return(
        <Paper sx={{backgroundColor: '#ffe6ff', margin:'1rem', borderRadius: '1rem'}}>
            <MasterContainer>
                <div style={{fontWeight: 'bold'}}>{order.tId}</div>
                <Container>
                    <div style={{fontWeight: 'bold'}}>Order Details</div>
                    {items.map((item, index)=>{
                        return(
                            <div key={index}>{item} : {order.itemsOrdered[item]}</div>
                        );
                    })}
                </Container>
                <Button variant="contained" color="success" onClick={deliverToTable}>Serve</Button>
            </MasterContainer>
        </Paper>
    );

};

export default ReadyToServe;