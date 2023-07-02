const mongoose = require('mongoose');
//const validator = require('validator');
const moment = require('moment');

const uri = "mongodb+srv://admin:kellner01@kellner01.cbxnkwq.mongodb.net/"
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
    restaurantID: {
        type: String,
        unique: true
        // required: [true, 'Restaurant requires an ID!']
        // will be set in the backend after request received 
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
    restaurantImage: { 

        type: String, 
        required: [true, 'Image of a restaurant'] 

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

    }
});

const restaurantData = mongoose.model('restaurantData', restaurantSchema)
module.exports = restaurantData