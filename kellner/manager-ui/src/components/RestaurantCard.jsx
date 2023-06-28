import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const Heading = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '1rem',
    fontWeight: 'bold'
});

const Content = styled('div')({
    fontFamily: 'Nunito',
    fontSize: '1rem',
    textAlign: 'left'
});

const RestaurantCard = ({ res })=>{
    async function deleteRestaurant(e){
        console.log(typeof(res._id));
        const response = await fetch(`http://localhost:5000/api/deleteRestaurant/:${res._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            })
        if(response.status === 200){
            window.location.reload();
        }
    }
    return(
        <Card sx={{margin: '0.6rem', border: '2px solid #006600', background: '#ffcc99', width: '20%'}}>
            <CardMedia
                component="img"
                alt="Restaurant"
                height="150"
                image= {res.restaurantImage}
            />
            <CardContent>
                <Heading>{res.restaurantName}</Heading>
                <Content>{res.description}</Content>
                <Content><span style={{fontWeight:'bold'}}>Location : </span>{res.location}</Content>
                <Content><span style={{fontWeight:'bold'}}>Phone : </span>{res.phoneNumber}</Content>
                <Content><span style={{fontWeight:'bold'}}>Tables : </span>{res.numTables}</Content>
            </CardContent>
            <CardActions>
                <Button variant='contained'>Show More</Button>
                <Button variant='contained' color="error" onClick={deleteRestaurant}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default RestaurantCard;