import { Grid } from "@mui/material";
import {Paper} from "@mui/material";
import styled from "@emotion/styled";

const Tile = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    minWidth: '30vw',
    minHeight: '30vh',
    alignItems: 'center',
    borderRadius: '2rem',
    position: 'relative',
    '&:hover' : {
        cursor: 'pointer',
    }
});

const Name = styled('div')({
    color: 'black',
    fontFamiliy: 'Nunito',
    fontWeight: 'bold',
    fontSize: '3rem',
});

const Description = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '3',
    position:'absolute',
    backgroundColor: 'black',
    opacity: '0',
    color: 'white',
    width: '100%',
    height: '100%',
    borderRadius: '2rem',
    fontSize: '2rem',
    transition: 'ease 0.5s',
    '&:hover':{
        opacity: '0.8'
    }
});
const Category = (props)=>{
    const cat = props.cat;
    return(
        <>
        <Grid item>
            <Paper sx={{margin: '2rem', borderRadius: '2rem'}}>
                <Tile style={{backgroundImage:`url(${cat.cImage})`, backgroundSize: 'cover'}}>
                    <div style={{background: 'white', padding:'1rem', borderRadius: '2rem'}}>
                        <Name>{cat.cName}</Name>
                    </div>
                    <Description>{cat.cDescription}</Description>
                </Tile>
            </Paper>
        </Grid>
        </>
    );
};

export default Category;