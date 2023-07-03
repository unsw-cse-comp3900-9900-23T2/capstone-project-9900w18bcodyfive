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

const categorySchema = new mongoose.Schema({
    cId: {
        type: Number,
        unique: true,
    },

    rId : {
        type : Number,
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
        type: Buffer,
    }
    
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category