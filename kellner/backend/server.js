const express = require('express');
const backend = express()
const mongoose = require('mongoose')
const app = require('./app.js');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './config/.env' });
const swagger = require('./services/swagger.js')

app.use('/api-docs', swagger.serveSwaggerDocs, swagger.setupSwaggerDocs);

const port = process.env.port || 5000
app.listen(port, ()=>{
    console.log(`The backend has taken its place on port ${port}`)
})

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



