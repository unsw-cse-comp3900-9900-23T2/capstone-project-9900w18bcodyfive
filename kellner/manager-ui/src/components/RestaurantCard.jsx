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
    return(
        <Card sx={{margin: '0.6rem', border: '2px solid #006600', background: '#ffcc99', width: '30%'}}>
            <CardMedia
                component="img"
                alt="Restaurant"
                height="100"
                image= {res.restaurantImage}
            />
            <CardContent>
                <Heading>{res.restaurantName}</Heading>
                <Content>{res.description}</Content>
            </CardContent>
            <CardActions>
                <Button variant='contained'>Show More</Button>
                <Button variant='contained' color="error">Delete</Button>
            </CardActions>
        </Card>
    );
}

export default RestaurantCard;