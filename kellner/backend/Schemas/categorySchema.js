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
    categoryID: {
        type: Number,
        required: [true, 'Category requires a custom ID!']
    },
    categoryName:   { 
        type: String, 
        required: [true, 'Category requires a name!'] 
    },
    restaurantID : {
        type : Number,
        required: [true, 'Category requires a restaurant ID!']
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category