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

const readyToServeSchema = new mongoose.Schema({

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

const readyToServe = mongoose.model('readyToServeOrders', readyToServeSchema)
module.exports = readyToServe