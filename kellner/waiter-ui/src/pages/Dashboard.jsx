import styled from "@emotion/styled";

// components import
import Header from "../components/Header";

const MasterContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '10rem'
});

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: '1'
});

const Dashboard = ()=>{
    return(
        <>
            <Header/>
            <MasterContainer>
                <Container>1</Container>
                <Container>1</Container>
                <Container>1</Container>
            </MasterContainer>
        </>
    );
}

export default Dashboard;