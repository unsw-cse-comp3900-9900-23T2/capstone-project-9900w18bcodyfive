const mongoose = require('mongoose');
const moment = require('moment');
require('dotenv').config({ path: './config/.env' });

const uri = process.env.MONGODB_URL
async function connect(){
    try{
        await mongoose.connect(uri)
        //console.log("Connected to DB")
    }catch(error){
        console.error(error)
    }
}
connect();

const assistanceSchema = new mongoose.Schema({

    aId:{
        type: String,
    },

    tId :{
        type: String,
    },

    rId : {
        type: String,
    },

    note :{
        type: String
    },


}, {timestamps:true})

const assistance  = mongoose.model('Assistance', assistanceSchema)
module.exports = assistance