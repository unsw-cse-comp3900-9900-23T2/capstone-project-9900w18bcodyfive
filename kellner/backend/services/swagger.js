
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

module.exports = {
  serveSwaggerDocs: swaggerUi.serve,
  setupSwaggerDocs: swaggerUi.setup(swaggerSpec),
};




