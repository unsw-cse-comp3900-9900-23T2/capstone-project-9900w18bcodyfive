const mongoose = require('mongoose');
//const validator = require('validator');
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

const categorySchema = new mongoose.Schema({
    cId: {
        type: String,
        unique: true,
    },

    rId : {
        type : String,
    },

    cName:   { 
        type: String, 
        required: [true, 'Category requires a name!'] 
    },

    cDescription:{
        type: String,
        required: true,
        
    },

    cType:{
        type: String,
        required: true,
    },

    cImage:{
        type: String,
    }
    
}, {timestamp:true});

const Category = mongoose.model('Category', categorySchema)
module.exports = Category