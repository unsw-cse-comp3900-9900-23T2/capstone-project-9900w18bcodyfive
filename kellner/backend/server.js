const express = require('express');
const backend = express()
const mongoose = require('mongoose')
const app = require('./app.js');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './config/.env' });


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kellner API',
      version: '1.1.1',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['Routers/routes.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve the Swagger documentation using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


const port = process.env.port || 5000


app.listen(port, ()=>{
    console.log(`The backend has taken its place on port ${port}`)
})

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



