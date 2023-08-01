import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import {Button} from "@mui/material";


const MasterContainer = styled('div')({
    display:'flex',
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
    alignItems: 'center',
    margin: '1rem',
    justifyContent: 'space-evenly',
    borderRadius: '1rem'
});

const Checkout = ({request})=>{
    const checkId = request.checkId;

    //function to serve the order which is already delivered to the table
    async function attendCheckOutRequest() {
        const response = await fetch(`http://localhost:5000/api/deleteCheckOutRequest/${checkId}`, {
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
                <div style={{fontWeight: 'bold'}}>{request.tId}</div>
                <div><span style={{fontWeight:'bold'}}>Payment Method : </span>{request.paymentMethod}</div>
                <Button variant="contained" color="success" onClick={attendCheckOutRequest}>attend</Button>
            </MasterContainer>
        </Paper>
    );

};

export default Checkout;