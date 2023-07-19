import { Grid } from "@mui/material";

//Components Import
import Item from "./item";


const Items = (props)=>{
    const items = props.items;
    return(
        <div>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {items.map((item, index)=>{
                    return(
                        <Item key={index} item={item}/>
                    );
                })}
            </Grid>
        </div>
    );

}

export default Items;