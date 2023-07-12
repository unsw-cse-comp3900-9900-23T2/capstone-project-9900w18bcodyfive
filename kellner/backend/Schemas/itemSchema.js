const mongoose = require('mongoose');
//const validator = require('validator');
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

const itemModel = new mongoose.Schema({

    iId :{

        type: String,
        required: true
    },
    
    cId :{

        type: String,
        required: true
    },

    rId :{

        type: String,
        required: true
    },

    iName: { 

        type: String, 
        required: true

    },

    iPrice: {
        type: Number,
        required: true,
        min: [0, 'Price must be a non-negative value'],
        max: [1000, 'Price cannot exceed 1000'],
    },

    iDescription: { 

        type: String, 
        required: true 

    },

    iIngredients:{
        type: String,
        required : true,
    },

    

    iImage:{
        type: String,
    },


}, {timestamps:true});

const Items = mongoose.model('Items', itemModel)
module.exports = Items