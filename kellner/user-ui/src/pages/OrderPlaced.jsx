import orderPlaced from "../assets/images/orderPlaced.gif"
const OrderPlaced = ()=>{
    return(
        <>
        <div style={{fontFamily: 'Nunito', fontWeight:'bold', fontSize:'2rem'}}>Order Placed !!!</div>
        <img src={orderPlaced} alt={'no contnet'}/>
        </>
    );
}

export default OrderPlaced;

