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

const finishedOrdersSchema = new mongoose.Schema({

    rId:{
        type: String,
    },

    tId:{
        type:String,
    },

    orderNo:{
        type:String,
    },

    itemsOrdered:{
        type: Object,
        default : {}
    },

    totalPrice:{
        type: String,
    },

    note:{
        type: String,
    },

},{timestamps:true});

const finishedOrders = mongoose.model('finishedOrders', finishedOrdersSchema)
module.exports = finishedOrders