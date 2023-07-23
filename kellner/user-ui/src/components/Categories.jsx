import { Grid } from "@mui/material";

//Components Import
import Category from "./Category";


const Categories = (props)=>{
    const categories = props.categories;
    return(
        <Grid container>
            {categories.map((cat, index)=>{
                return(
                    <Category key={index} cat={cat}/>
                );
            })}
        </Grid>
    );

}

export default Categories;