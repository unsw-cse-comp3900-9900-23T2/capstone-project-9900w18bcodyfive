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

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});
const ReadyToServe = ({order})=>{
    const orderNo = order.orderNo;

    let items = [];

    //Extracting the list of items ordered
    for (const i in order.itemsOrdered) {
        items.push(i);
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
                <Button variant="contained" color="success">Serve</Button>
            </MasterContainer>
        </Paper>
    );

};

export default ReadyToServe;