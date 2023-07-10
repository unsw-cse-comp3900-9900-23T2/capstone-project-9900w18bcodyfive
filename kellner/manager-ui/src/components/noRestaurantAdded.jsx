import styled from "@emotion/styled";

//Component and image imports
import noContentAdded from "../assets/images/noContentAdded.jpg";

const Container = styled('div')({
    display: 'flex',
    margin: '0',
    width: '100%',
    height: '1000px',
    justifyContent: 'space-between'
});

const Child = styled('div')({
    border: '2px solid #006600',
    fontFamily: "Nunito",
    fontSize: '2rem',
    flex: '1'
});

const Image = styled('div')({
    border: '2px solid #006600',
    backgroundImage: `url(${noContentAdded})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    flex:'1'
})

const NoRestaurantAdded  = ()=>{
    return(
        <Container>
            <Child>You have not added any restaurants<br/>You have not added any restaurants<br/>You have not added any restaurants<br/>You have not added any restaurants<br/>You have not added any restaurants<br/>You have not added any restaurants<br/></Child>
            {/* <Child><img src={noContentAdded} alt={'No content added'} style={{objectFit: 'fill'}}/></Child> */}
            <Image />
        </Container>
    );
};

export default NoRestaurantAdded;

