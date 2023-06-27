const express = require('express');
const backend = express()
const mongoose = require('mongoose')
const app = require('./app.js');

const port = process.env.port || 5000

app.listen(port, ()=>{
    console.log("Backend Running on port: "+ port)
})

// const uri = "mongodb+srv://admin:kellner01@kellner01.fbuuqzb.mongodb.net/"
// async function connect(){
//     try{
//         await mongoose.connect(uri)
//         //console.log("Connected to DB")
//     }catch(error){
//         console.error(error)
//     }
// }
// connect();  //connecting to db