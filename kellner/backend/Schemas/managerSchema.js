const mongoose = require('mongoose');
const validator = require('validator');

const uri = "mongodb+srv://admin:kellner01@kellner01.cbxnkwq.mongodb.net/"
async function connect(){
    try{
        await mongoose.connect(uri)
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