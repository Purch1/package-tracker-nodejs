import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Delivery API',
    version: '1.0.0',
    description: 'API documentation for the Delivery app'
  },
  servers: [
    {
      url: 'http://localhost:9500/api/v1',
      description: 'Development server'
    }
  ]
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Then, use it as before
console.log('Swagger is scanning files at:', path.resolve(__dirname, '../web/routes/**/*.js'));

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../web/routes/**/*.js')], // Update this path if needed
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
