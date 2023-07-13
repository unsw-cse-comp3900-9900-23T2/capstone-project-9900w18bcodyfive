import { Dialog } from "@mui/material";
import styled from "@emotion/styled";
import Button from "@mui/material";

const MasterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const ElementContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
})

const TableID = (props)=>{
    let tId = [];
    for (const t in props.tableID){
        tId.push(props.tableID.t)
    }
    return(
        <Dialog open={props.open}>
            <MasterContainer>
                {tId.map((id, index)=>{
                    <ElementContainer key={index}>
                        <div>Table number {index+1}</div>
                        <div>{id}</div>
                    </ElementContainer>
                })}
            </MasterContainer>
        </Dialog>
    );
}

export default TableID;