const express = require('express');
const backend = express()
const mongoose = require('mongoose')
const app = require('./app.js');

const port = process.env.port || 5000

app.listen(port, ()=>{
    console.log("Backend Running on port: "+ port)
})
