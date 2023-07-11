const mongoose = require('mongoose');
const validator = require('validator');
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

const restaurantSchema = new mongoose.Schema({

    resId: {
        type: String,

    },

    managerId : {
        type:String
    },

    rName: { 
        type: String, 
        required: [true, 'Restaurant requires a name!'] 
    },

    rLocation: { 

        type: String, 
        required: [true, 'Restaurant requires a location!'] 
    },

    rDescription: { 

        type: String, 
        required: [true, 'Restaurant requires a description!'] 
    
    },
    
    rImage: { 

        type: String, 

    },
    
    rContact: {
        type: String,
        required: true,
        maxlength: [12, 'Phone number can be at most 12 digits long'],
    },

    rTableCount: { 

        type: Number, 
        required: true, 
        min: [1, 'Too few tables']

    },

    rTableIds : {
        type : Object,
        default : {}
    }
}, {timestamps: true});

const restaurantData = mongoose.model('restaurantData', restaurantSchema)
module.exports = restaurantData