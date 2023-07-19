import { Grid } from "@mui/material";

//Components Import
import Category from "./Category";


const Categories = (props)=>{
    const categories = props.categories;
    return(
        <div>
            <Grid container>
                {categories.map((cat, index)=>{
                    return(
                        <Category key={index} cat={cat}/>
                    );
                })}
            </Grid>
        </div>
    );

}

export default Categories;