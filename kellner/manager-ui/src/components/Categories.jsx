import React from "react";
import { Grid } from "@mui/material";
import CategoryCard from "./CategoryCard";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {Button} from "@mui/material";

//Components Import
import NoCategories from "./NoCategories";
import AddCategories from "./AddCategory";

const Categories = (props)=>{
    const rId = props.res.resId;
    const [categories, setCategories] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    // function to open add category
    const handleOpen = ()=>{
        setOpen(true);
    }

    // function to clode add categories
    const handleClose = ()=>{
        setOpen(false);
    }


    React.useEffect(()=>{
        // function to fetch categories from backend
        async function getCategories() {
            const response = await fetch(`http://localhost:5000/api/getCategory/${rId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
        
            const data = await response.json();
            if (response.status === 200){
                console.log(data.category);
                setCategories(data.category);
            }
        
        }
        getCategories();
    },[rId]);
    return(
        <>
            {categories.length === 0 ?(
                <NoCategories res={props.res}/>
            ):(
                <>
                    <Button variant="contained" color="success" sx={{margin: '1rem'}} onClick={handleOpen}>
                        <AddCircleRoundedIcon sx={{color:'white', fontSize:'2.5rem'}}/>
                        <span style={{margin: '0 1rem', fontSize:'1rem'}}>Add Category</span>
                    </Button>
                    <AddCategories open={open} res={props.res} handleClose={handleClose}/>
                    <Grid container sx={{margin:'2rem'}}>
                        {categories.map((cat)=>{
                            return(
                                <CategoryCard key={cat.cId} cat={cat}/>
                            );
                        })}
                    </Grid>
                </>
            )}
        </>
    );
}

export default Categories;