import { Dialog } from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from '@mui/icons-material/Close';

const MasterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '2rem',
    fontFamily: 'Nunito',
})

const ElementContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '2rem',
    margin: '1rem',
    gap: '1rem 1rem'
})

const HeadingContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'green'
})

const CloseEffect = styled('div')({
    '&:hover': {
        cursor: 'pointer',
        transform: 'scale(0.75)'
    }
})

const TableId = (props)=>{
    let tId = [];
    for (const t in props.tableId){
        tId.push(props.tableId[t])
    }
    return(
        <Dialog open={props.open}>
            <HeadingContainer>
                <div>Table ID Mapping</div>
                <CloseEffect>
                    <CloseIcon onClick={props.handleClose} sx={{fontSize: '2.5rem'}}/>
                </CloseEffect>
            </HeadingContainer>
            <MasterContainer>
                {tId.map((id, index)=>{
                    return(
                        <ElementContainer key={index}>
                            <div>Table number {index+1}:</div>
                            <div style={{color:'green', fontWeight: 'bold'}}>{id}</div>
                        </ElementContainer>
                    );
                })}
            </MasterContainer>
        </Dialog>
    );
}

export default TableId;