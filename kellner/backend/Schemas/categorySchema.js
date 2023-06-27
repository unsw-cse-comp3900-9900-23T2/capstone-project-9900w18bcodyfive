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

const categorySchema = new mongoose.Schema({

    categoryName:   { 

        type: String, 
        required: true 
    
    },

    restaurantID : {

        type : Number,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category