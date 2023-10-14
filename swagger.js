const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
        title: 'BYU-I - CSE341 - Final Team Project',
        description: 'Car Sales Manager API'
    },
    host: 'car-sales-manager.onrender.com/',
    schemes: ['https', 'http']
};

swaggerAutogen(outputFile, endpointsFiles, doc);