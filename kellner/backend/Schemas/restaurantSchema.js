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

const restaurantSchema = new mongoose.Schema({

    managerToken:{
        type: String,


    },

    restaurantName: { 
        type: String, 
        required: [true, 'Restaurant requires a name!'] 
    },

    restaurantType: {

        type: String, 
        required: [true, 'Type of restaurant!'] 

    }, // remove it later if we need to
    description: { 

        type: String, 
        required: [true, 'Restaurant requires a description!'] 
    
    },

    location: { 

        type: String, 
        required: [true, 'Restaurant requires a location!'] 
    },

    phoneNumber: { 

        type: Number, 
        required: true, 
        minlength: 9, 
        maxlength: 9 

    }, // needs validation with a regular expression
    
    numTables: { 

        type: Number, 
        required: true, 
        min: [1, 'Too few tables'] 

        },
});

const restaurantData = mongoose.model('restaurantData', restaurantSchema)
module.exports = restaurantData