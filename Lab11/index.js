const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// Configurar body-parser

app.use(bodyParser.urlencoded({ extended: false }));

// Rutas

const rutas = require('./.routes.js');

// Usar rutas

app.use('/', rutas);

// Levantar el servidor

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
