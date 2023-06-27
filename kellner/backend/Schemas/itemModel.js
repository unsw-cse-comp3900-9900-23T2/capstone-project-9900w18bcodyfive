const mongoose = require('mongoose');
//const validator = require('validator');
const moment = require('moment');

const uri = "mongodb+srv://admin:kellner01@kellner01.fbuuqzb.mongodb.net/"
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

    itemName: { 

        type: String, 
        required: true

    },
    price: { 

        type: Number, 
        required: true 

        },
    description: { 

        type: String, 
        required: true 

    },

    category :{

        type: String,
        required: true
    }

})

const FoodItem = mongoose.model('Food Item', itemModel)
module.exports = FoodItem