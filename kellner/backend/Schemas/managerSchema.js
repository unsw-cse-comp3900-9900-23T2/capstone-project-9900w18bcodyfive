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

const managerSchema = new mongoose.Schema({

    mId:{
        type: String,
    },

    mName: {

        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z0-9]+$/,

    },

    mEmail:  { 

        type: String, 
        required: true,
        trim: true

    },

    mPassword: {

        type: String,
        required: true,
        trim: true,

    },

    mContact: {
        type: String,
        required: true,
        maxlength: [12, 'Phone number can be at most 12 digits long'],
    },

   

})

const Manager = mongoose.model('Manager', managerSchema)
module.exports = Manager