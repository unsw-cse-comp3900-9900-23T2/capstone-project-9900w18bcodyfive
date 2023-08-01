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

const Assistance = ({request})=>{
    const aId = request.aId;

    //function to serve the order which is already delivered to the table
    async function attendRequest() {
        const response = await fetch(`http://localhost:5000/api/deleteAssistanceRequest/${aId}`, {
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
                {(request.note !== "") ? (
                    <div style={{color:'red'}}>{request.note}</div>
                ):(<></>)}
                <Button variant="contained" color="success" onClick={attendRequest}>attend</Button>
            </MasterContainer>
        </Paper>
    );

};

export default Assistance;