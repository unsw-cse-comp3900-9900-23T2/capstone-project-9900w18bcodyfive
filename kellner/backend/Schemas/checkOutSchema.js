const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const uri = process.env.MONGODB_URL
async function connect(){
    try{
        await mongoose.connect(uri)
    }catch(error){
        console.error(error)
    }
}
connect();

const checkOutSchema = mongoose.Schema({
    checkId : {
        type: String
    },

    rId:{
        type: String
    },

    tId:{
        type: String,
    },

    paymentMethod:{
        type: String
    },

    totalPrice :{
        type: String
    }
   

}, {timestamps : true})

const CheckOut = mongoose.model('CheckOut', checkOutSchema)
module.exports = CheckOut
