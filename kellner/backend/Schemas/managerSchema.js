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

const managerSchema = new mongoose.Schema({

    userName: {

        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9]+$/,

    },

    email:  { 

        type: String, 
        required: true,
        trim: true

    },

    password: {

        type: String,
        required: true,
        trim: true,

    },

    managerToken:{

        type: String,
        trim: true
    }

})

const Manager = mongoose.model('Manager', managerSchema)
module.exports = Manager