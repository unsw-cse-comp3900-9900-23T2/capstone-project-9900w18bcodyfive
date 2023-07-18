import { Grid } from "@mui/material";

//Components Import
import Category from "./Category";


const Categories = (props)=>{
    const categories = props.categories;
    console.log(categories);
    return(
        <div>
            <Grid container>
                {categories.map((cat)=>{
                    return(
                        <Category cat={cat}/>
                    );
                })}
            </Grid>
        </div>
    );

}

export default Categories;